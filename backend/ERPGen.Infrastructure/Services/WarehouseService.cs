using ERPGen.Application.DTOs.Inventory;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class WarehouseService : IWarehouseService
{
    private readonly ApplicationDbContext _context;

    public WarehouseService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<WarehouseResponseDto>> GetWarehousesAsync(
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Warehouses.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(w => w.Name.Contains(term) || w.Code.Contains(term));
        }

        if (isActive.HasValue)
        {
            query = query.Where(w => w.IsActive == isActive.Value);
        }

        var list = await query
            .OrderBy(w => w.Name)
            .Select(w => new WarehouseResponseDto
            {
                Id = w.Id,
                Name = w.Name,
                Code = w.Code,
                Description = w.Description,
                IsActive = w.IsActive,
                TotalProductsInStock = w.StockBalances.Count(b => b.Quantity > 0),
                TotalStockQuantity = w.StockBalances.Sum(b => b.Quantity),
                CreatedAt = w.CreatedAt,
                UpdatedAt = w.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return list;
    }

    public async Task<WarehouseResponseDto> GetWarehouseByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var warehouse = await _context.Warehouses
            .AsNoTracking()
            .Where(w => w.Id == id)
            .Select(w => new WarehouseResponseDto
            {
                Id = w.Id,
                Name = w.Name,
                Code = w.Code,
                Description = w.Description,
                IsActive = w.IsActive,
                TotalProductsInStock = w.StockBalances.Count(b => b.Quantity > 0),
                TotalStockQuantity = w.StockBalances.Sum(b => b.Quantity),
                CreatedAt = w.CreatedAt,
                UpdatedAt = w.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (warehouse == null)
        {
            throw new AppException("Warehouse not found.", 404);
        }

        return warehouse;
    }

    public async Task<WarehouseResponseDto> CreateWarehouseAsync(CreateWarehouseDto request, CancellationToken cancellationToken = default)
    {
        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();

        var exists = await _context.Warehouses
            .AnyAsync(w => w.Code.ToLower() == trimmedCode.ToLower(), cancellationToken);

        if (exists)
        {
            throw new AppException($"Warehouse with code '{trimmedCode}' already exists.", 409);
        }

        var warehouse = new Warehouse
        {
            Id = Guid.NewGuid(),
            Name = trimmedName,
            Code = trimmedCode,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Warehouses.Add(warehouse);
        await _context.SaveChangesAsync(cancellationToken);

        return new WarehouseResponseDto
        {
            Id = warehouse.Id,
            Name = warehouse.Name,
            Code = warehouse.Code,
            Description = warehouse.Description,
            IsActive = warehouse.IsActive,
            TotalProductsInStock = 0,
            TotalStockQuantity = 0,
            CreatedAt = warehouse.CreatedAt,
            UpdatedAt = warehouse.UpdatedAt
        };
    }

    public async Task<WarehouseResponseDto> UpdateWarehouseAsync(Guid id, UpdateWarehouseDto request, CancellationToken cancellationToken = default)
    {
        var warehouse = await _context.Warehouses
            .Include(w => w.StockBalances)
            .FirstOrDefaultAsync(w => w.Id == id, cancellationToken);

        if (warehouse == null)
        {
            throw new AppException("Warehouse not found.", 404);
        }

        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();

        var duplicateExists = await _context.Warehouses
            .AnyAsync(w => w.Id != id && w.Code.ToLower() == trimmedCode.ToLower(), cancellationToken);

        if (duplicateExists)
        {
            throw new AppException($"Warehouse with code '{trimmedCode}' already exists.", 409);
        }

        warehouse.Name = trimmedName;
        warehouse.Code = trimmedCode;
        warehouse.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        warehouse.IsActive = request.IsActive;
        warehouse.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new WarehouseResponseDto
        {
            Id = warehouse.Id,
            Name = warehouse.Name,
            Code = warehouse.Code,
            Description = warehouse.Description,
            IsActive = warehouse.IsActive,
            TotalProductsInStock = warehouse.StockBalances.Count(b => b.Quantity > 0),
            TotalStockQuantity = warehouse.StockBalances.Sum(b => b.Quantity),
            CreatedAt = warehouse.CreatedAt,
            UpdatedAt = warehouse.UpdatedAt
        };
    }

    public async Task<WarehouseResponseDto> UpdateWarehouseStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default)
    {
        var warehouse = await _context.Warehouses
            .Include(w => w.StockBalances)
            .FirstOrDefaultAsync(w => w.Id == id, cancellationToken);

        if (warehouse == null)
        {
            throw new AppException("Warehouse not found.", 404);
        }

        warehouse.IsActive = isActive;
        warehouse.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new WarehouseResponseDto
        {
            Id = warehouse.Id,
            Name = warehouse.Name,
            Code = warehouse.Code,
            Description = warehouse.Description,
            IsActive = warehouse.IsActive,
            TotalProductsInStock = warehouse.StockBalances.Count(b => b.Quantity > 0),
            TotalStockQuantity = warehouse.StockBalances.Sum(b => b.Quantity),
            CreatedAt = warehouse.CreatedAt,
            UpdatedAt = warehouse.UpdatedAt
        };
    }
}
