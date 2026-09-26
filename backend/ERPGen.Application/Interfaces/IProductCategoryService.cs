using ERPGen.Application.DTOs.Catalog;

namespace ERPGen.Application.Interfaces;

public interface IProductCategoryService
{
    Task<IReadOnlyList<ProductCategoryResponseDto>> GetCategoriesAsync(bool? isActive = null, CancellationToken cancellationToken = default);
    Task<ProductCategoryResponseDto> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProductCategoryResponseDto> CreateCategoryAsync(CreateProductCategoryDto request, CancellationToken cancellationToken = default);
    Task<ProductCategoryResponseDto> UpdateCategoryAsync(Guid id, UpdateProductCategoryDto request, CancellationToken cancellationToken = default);
    Task<ProductCategoryResponseDto> UpdateCategoryStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default);
}
