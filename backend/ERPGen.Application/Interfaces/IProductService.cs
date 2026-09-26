using ERPGen.Application.DTOs.Catalog;
using ERPGen.Application.DTOs.Common;

namespace ERPGen.Application.Interfaces;

public interface IProductService
{
    Task<PaginatedResultDto<ProductResponseDto>> GetProductsAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        Guid? categoryId = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    Task<ProductResponseDto> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProductResponseDto> CreateProductAsync(CreateProductDto request, CancellationToken cancellationToken = default);
    Task<ProductResponseDto> UpdateProductAsync(Guid id, UpdateProductDto request, CancellationToken cancellationToken = default);
    Task<ProductResponseDto> UpdateProductStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default);
}
