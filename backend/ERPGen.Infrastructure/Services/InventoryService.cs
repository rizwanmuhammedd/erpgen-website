using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Inventory;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Domain.Enums;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class InventoryService : IInventoryService
{
    private readonly ApplicationDbContext _context;

    public InventoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedResultDto<StockBalanceResponseDto>> GetStockBalancesAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        Guid? warehouseId = null,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.StockBalances
            .AsNoTracking()
            .Include(b => b.Product)
            .Include(b => b.Warehouse)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(b => b.Product.Name.Contains(term) || b.Product.SKU.Contains(term));
        }

        if (warehouseId.HasValue)
        {
            query = query.Where(b => b.WarehouseId == warehouseId.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(b => b.UpdatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(b => new StockBalanceResponseDto
            {
                Id = b.Id,
                ProductId = b.ProductId,
                ProductName = b.Product.Name,
                ProductSKU = b.Product.SKU,
                ProductUnit = b.Product.Unit,
                WarehouseId = b.WarehouseId,
                WarehouseName = b.Warehouse.Name,
                WarehouseCode = b.Warehouse.Code,
                Quantity = b.Quantity,
                UpdatedAt = b.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResultDto<StockBalanceResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<StockBalanceResponseDto> GetStockBalanceAsync(
        Guid productId,
        Guid warehouseId,
        CancellationToken cancellationToken = default)
    {
        var product = await _context.Products
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);

        if (product == null)
        {
            throw new AppException("Product not found.", 404);
        }

        var warehouse = await _context.Warehouses
            .AsNoTracking()
            .FirstOrDefaultAsync(w => w.Id == warehouseId, cancellationToken);

        if (warehouse == null)
        {
            throw new AppException("Warehouse not found.", 404);
        }

        var balance = await _context.StockBalances
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.ProductId == productId && b.WarehouseId == warehouseId, cancellationToken);

        if (balance == null)
        {
            return new StockBalanceResponseDto
            {
                Id = Guid.Empty,
                ProductId = product.Id,
                ProductName = product.Name,
                ProductSKU = product.SKU,
                ProductUnit = product.Unit,
                WarehouseId = warehouse.Id,
                WarehouseName = warehouse.Name,
                WarehouseCode = warehouse.Code,
                Quantity = 0,
                UpdatedAt = DateTime.UtcNow
            };
        }

        return new StockBalanceResponseDto
        {
            Id = balance.Id,
            ProductId = product.Id,
            ProductName = product.Name,
            ProductSKU = product.SKU,
            ProductUnit = product.Unit,
            WarehouseId = warehouse.Id,
            WarehouseName = warehouse.Name,
            WarehouseCode = warehouse.Code,
            Quantity = balance.Quantity,
            UpdatedAt = balance.UpdatedAt
        };
    }

    public async Task<StockAdjustmentResponseDto> AdjustStockAsync(
        StockAdjustmentRequestDto request,
        string? userId = null,
        CancellationToken cancellationToken = default)
    {
        if (request.Quantity <= 0)
        {
            throw new AppException("Adjustment quantity must be greater than 0.", 400);
        }

        var direction = request.Direction.Trim();
        if (!direction.Equals("In", StringComparison.OrdinalIgnoreCase) &&
            !direction.Equals("Out", StringComparison.OrdinalIgnoreCase))
        {
            throw new AppException("Direction must be either 'In' or 'Out'.", 400);
        }

        if (string.IsNullOrWhiteSpace(request.Reason))
        {
            throw new AppException("Adjustment reason is required.", 400);
        }

        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == request.ProductId, cancellationToken);

        if (product == null)
        {
            throw new AppException("Product not found.", 404);
        }

        var warehouse = await _context.Warehouses
            .FirstOrDefaultAsync(w => w.Id == request.WarehouseId, cancellationToken);

        if (warehouse == null)
        {
            throw new AppException("Warehouse not found.", 404);
        }

        if (!warehouse.IsActive)
        {
            throw new AppException($"Warehouse '{warehouse.Name}' is inactive. Stock adjustments are not allowed.", 400);
        }

        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var balance = await _context.StockBalances
                .FirstOrDefaultAsync(b => b.ProductId == request.ProductId && b.WarehouseId == request.WarehouseId, cancellationToken);

            if (balance == null)
            {
                balance = new StockBalance
                {
                    Id = Guid.NewGuid(),
                    ProductId = request.ProductId,
                    WarehouseId = request.WarehouseId,
                    Quantity = 0,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.StockBalances.Add(balance);
            }

            decimal newQuantity;
            StockMovementType movementType;

            if (direction.Equals("In", StringComparison.OrdinalIgnoreCase))
            {
                newQuantity = balance.Quantity + request.Quantity;
                movementType = request.MovementType ?? StockMovementType.In;
            }
            else
            {
                // NEGATIVE STOCK PROTECTION
                if (balance.Quantity < request.Quantity)
                {
                    throw new AppException(
                        $"Insufficient stock. Current available quantity is {balance.Quantity:0.###} {product.Unit}, but attempted to deduct {request.Quantity:0.###} {product.Unit}.",
                        400);
                }

                newQuantity = balance.Quantity - request.Quantity;
                movementType = request.MovementType ?? StockMovementType.Out;
            }

            balance.Quantity = newQuantity;
            balance.UpdatedAt = DateTime.UtcNow;

            var movement = new StockMovement
            {
                Id = Guid.NewGuid(),
                ProductId = request.ProductId,
                WarehouseId = request.WarehouseId,
                MovementType = movementType,
                Quantity = request.Quantity,
                BalanceAfter = newQuantity,
                ReferenceType = string.IsNullOrWhiteSpace(request.ReferenceType) ? "StockAdjustment" : request.ReferenceType.Trim(),
                ReferenceId = string.IsNullOrWhiteSpace(request.ReferenceId) ? null : request.ReferenceId.Trim(),
                Reason = request.Reason.Trim(),
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId
            };

            _context.StockMovements.Add(movement);

            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            string? userName = null;
            if (!string.IsNullOrWhiteSpace(userId))
            {
                var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
                userName = user?.FullName ?? user?.UserName;
            }

            return new StockAdjustmentResponseDto
            {
                StockBalance = new StockBalanceResponseDto
                {
                    Id = balance.Id,
                    ProductId = product.Id,
                    ProductName = product.Name,
                    ProductSKU = product.SKU,
                    ProductUnit = product.Unit,
                    WarehouseId = warehouse.Id,
                    WarehouseName = warehouse.Name,
                    WarehouseCode = warehouse.Code,
                    Quantity = balance.Quantity,
                    UpdatedAt = balance.UpdatedAt
                },
                StockMovement = new StockMovementResponseDto
                {
                    Id = movement.Id,
                    ProductId = product.Id,
                    ProductName = product.Name,
                    ProductSKU = product.SKU,
                    ProductUnit = product.Unit,
                    WarehouseId = warehouse.Id,
                    WarehouseName = warehouse.Name,
                    WarehouseCode = warehouse.Code,
                    MovementType = movement.MovementType,
                    Quantity = movement.Quantity,
                    BalanceAfter = movement.BalanceAfter,
                    ReferenceType = movement.ReferenceType,
                    ReferenceId = movement.ReferenceId,
                    Reason = movement.Reason,
                    CreatedAt = movement.CreatedAt,
                    CreatedByUserId = movement.CreatedByUserId,
                    CreatedByUserName = userName
                }
            };
        }
        catch (DbUpdateConcurrencyException)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw new AppException("A concurrency conflict occurred while updating stock. Another transaction modified this stock balance. Please refresh and try again.", 409);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    public async Task<PaginatedResultDto<StockMovementResponseDto>> GetStockMovementsAsync(
        int page = 1,
        int pageSize = 20,
        Guid? productId = null,
        Guid? warehouseId = null,
        StockMovementType? movementType = null,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.StockMovements
            .AsNoTracking()
            .Include(m => m.Product)
            .Include(m => m.Warehouse)
            .Include(m => m.CreatedByUser)
            .AsQueryable();

        if (productId.HasValue)
        {
            query = query.Where(m => m.ProductId == productId.Value);
        }

        if (warehouseId.HasValue)
        {
            query = query.Where(m => m.WarehouseId == warehouseId.Value);
        }

        if (movementType.HasValue)
        {
            query = query.Where(m => m.MovementType == movementType.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(m => m.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new StockMovementResponseDto
            {
                Id = m.Id,
                ProductId = m.ProductId,
                ProductName = m.Product.Name,
                ProductSKU = m.Product.SKU,
                ProductUnit = m.Product.Unit,
                WarehouseId = m.WarehouseId,
                WarehouseName = m.Warehouse.Name,
                WarehouseCode = m.Warehouse.Code,
                MovementType = m.MovementType,
                Quantity = m.Quantity,
                BalanceAfter = m.BalanceAfter,
                ReferenceType = m.ReferenceType,
                ReferenceId = m.ReferenceId,
                Reason = m.Reason,
                CreatedAt = m.CreatedAt,
                CreatedByUserId = m.CreatedByUserId,
                CreatedByUserName = m.CreatedByUser != null ? (m.CreatedByUser.FullName ?? m.CreatedByUser.UserName) : null
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResultDto<StockMovementResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}
