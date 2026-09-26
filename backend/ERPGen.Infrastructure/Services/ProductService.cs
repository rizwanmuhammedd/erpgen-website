using ERPGen.Application.DTOs.Catalog;
using ERPGen.Application.DTOs.Common;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedResultDto<ProductResponseDto>> GetProductsAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        Guid? categoryId = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(p => p.Name.Contains(term) || p.SKU.Contains(term));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        if (isActive.HasValue)
        {
            query = query.Where(p => p.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                SKU = p.SKU,
                Description = p.Description,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null,
                Unit = p.Unit,
                CostPrice = p.CostPrice,
                SellingPrice = p.SellingPrice,
                IsActive = p.IsActive,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResultDto<ProductResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<ProductResponseDto> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                SKU = p.SKU,
                Description = p.Description,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null,
                Unit = p.Unit,
                CostPrice = p.CostPrice,
                SellingPrice = p.SellingPrice,
                IsActive = p.IsActive,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (product == null)
        {
            throw new AppException("Product not found.", 404);
        }

        return product;
    }

    public async Task<ProductResponseDto> CreateProductAsync(CreateProductDto request, CancellationToken cancellationToken = default)
    {
        if (request.CostPrice < 0)
        {
            throw new AppException("Cost price must be greater than or equal to 0.", 400);
        }

        if (request.SellingPrice < 0)
        {
            throw new AppException("Selling price must be greater than or equal to 0.", 400);
        }

        var trimmedSku = request.SKU.Trim();
        var normalizedSku = trimmedSku.ToLower();

        var skuExists = await _context.Products
            .AnyAsync(p => p.SKU.ToLower() == normalizedSku, cancellationToken);

        if (skuExists)
        {
            throw new AppException($"Product with SKU '{trimmedSku}' already exists.", 409);
        }

        string? categoryName = null;
        if (request.CategoryId.HasValue)
        {
            var category = await _context.ProductCategories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == request.CategoryId.Value, cancellationToken);

            if (category == null)
            {
                throw new AppException("Selected category does not exist.", 400);
            }

            categoryName = category.Name;
        }

        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            SKU = trimmedSku,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            CategoryId = request.CategoryId,
            Unit = request.Unit.Trim(),
            CostPrice = request.CostPrice,
            SellingPrice = request.SellingPrice,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync(cancellationToken);

        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            SKU = product.SKU,
            Description = product.Description,
            CategoryId = product.CategoryId,
            CategoryName = categoryName,
            Unit = product.Unit,
            CostPrice = product.CostPrice,
            SellingPrice = product.SellingPrice,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    public async Task<ProductResponseDto> UpdateProductAsync(Guid id, UpdateProductDto request, CancellationToken cancellationToken = default)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (product == null)
        {
            throw new AppException("Product not found.", 404);
        }

        if (request.CostPrice < 0)
        {
            throw new AppException("Cost price must be greater than or equal to 0.", 400);
        }

        if (request.SellingPrice < 0)
        {
            throw new AppException("Selling price must be greater than or equal to 0.", 400);
        }

        var trimmedSku = request.SKU.Trim();
        var normalizedSku = trimmedSku.ToLower();

        var duplicateSku = await _context.Products
            .AnyAsync(p => p.Id != id && p.SKU.ToLower() == normalizedSku, cancellationToken);

        if (duplicateSku)
        {
            throw new AppException($"Product with SKU '{trimmedSku}' already exists.", 409);
        }

        string? categoryName = null;
        if (request.CategoryId.HasValue)
        {
            var category = await _context.ProductCategories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == request.CategoryId.Value, cancellationToken);

            if (category == null)
            {
                throw new AppException("Selected category does not exist.", 400);
            }

            categoryName = category.Name;
        }

        product.Name = request.Name.Trim();
        product.SKU = trimmedSku;
        product.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        product.CategoryId = request.CategoryId;
        product.Unit = request.Unit.Trim();
        product.CostPrice = request.CostPrice;
        product.SellingPrice = request.SellingPrice;
        product.IsActive = request.IsActive;
        product.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            SKU = product.SKU,
            Description = product.Description,
            CategoryId = product.CategoryId,
            CategoryName = categoryName,
            Unit = product.Unit,
            CostPrice = product.CostPrice,
            SellingPrice = product.SellingPrice,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    public async Task<ProductResponseDto> UpdateProductStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (product == null)
        {
            throw new AppException("Product not found.", 404);
        }

        product.IsActive = isActive;
        product.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            SKU = product.SKU,
            Description = product.Description,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name,
            Unit = product.Unit,
            CostPrice = product.CostPrice,
            SellingPrice = product.SellingPrice,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }
}
