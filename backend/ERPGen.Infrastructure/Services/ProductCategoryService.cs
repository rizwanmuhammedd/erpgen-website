using ERPGen.Application.DTOs.Catalog;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class ProductCategoryService : IProductCategoryService
{
    private readonly ApplicationDbContext _context;

    public ProductCategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<ProductCategoryResponseDto>> GetCategoriesAsync(bool? isActive = null, CancellationToken cancellationToken = default)
    {
        var query = _context.ProductCategories.AsNoTracking().AsQueryable();

        if (isActive.HasValue)
        {
            query = query.Where(c => c.IsActive == isActive.Value);
        }

        var categories = await query
            .OrderBy(c => c.Name)
            .Select(c => new ProductCategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                IsActive = c.IsActive,
                ProductCount = c.Products.Count(),
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return categories;
    }

    public async Task<ProductCategoryResponseDto> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await _context.ProductCategories
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new ProductCategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                IsActive = c.IsActive,
                ProductCount = c.Products.Count(),
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (category == null)
        {
            throw new AppException("Product category not found.", 404);
        }

        return category;
    }

    public async Task<ProductCategoryResponseDto> CreateCategoryAsync(CreateProductCategoryDto request, CancellationToken cancellationToken = default)
    {
        var trimmedName = request.Name.Trim();
        var normalizedName = trimmedName.ToLower();

        var exists = await _context.ProductCategories
            .AnyAsync(c => c.Name.ToLower() == normalizedName, cancellationToken);

        if (exists)
        {
            throw new AppException($"Category with name '{trimmedName}' already exists.", 409);
        }

        var category = new ProductCategory
        {
            Id = Guid.NewGuid(),
            Name = trimmedName,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.ProductCategories.Add(category);
        await _context.SaveChangesAsync(cancellationToken);

        return new ProductCategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            IsActive = category.IsActive,
            ProductCount = 0,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }

    public async Task<ProductCategoryResponseDto> UpdateCategoryAsync(Guid id, UpdateProductCategoryDto request, CancellationToken cancellationToken = default)
    {
        var category = await _context.ProductCategories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

        if (category == null)
        {
            throw new AppException("Product category not found.", 404);
        }

        var trimmedName = request.Name.Trim();
        var normalizedName = trimmedName.ToLower();

        var duplicateExists = await _context.ProductCategories
            .AnyAsync(c => c.Id != id && c.Name.ToLower() == normalizedName, cancellationToken);

        if (duplicateExists)
        {
            throw new AppException($"Category with name '{trimmedName}' already exists.", 409);
        }

        category.Name = trimmedName;
        category.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        category.IsActive = request.IsActive;
        category.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new ProductCategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            IsActive = category.IsActive,
            ProductCount = category.Products.Count,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }

    public async Task<ProductCategoryResponseDto> UpdateCategoryStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default)
    {
        var category = await _context.ProductCategories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

        if (category == null)
        {
            throw new AppException("Product category not found.", 404);
        }

        category.IsActive = isActive;
        category.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new ProductCategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            IsActive = category.IsActive,
            ProductCount = category.Products.Count,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }
}
