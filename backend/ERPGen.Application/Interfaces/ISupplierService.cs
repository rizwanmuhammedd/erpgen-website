using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;

namespace ERPGen.Application.Interfaces;

public interface ISupplierService
{
    Task<PaginatedResultDto<SupplierResponseDto>> GetSuppliersAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    Task<SupplierResponseDto> GetSupplierByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<SupplierResponseDto> CreateSupplierAsync(CreateSupplierDto request, CancellationToken cancellationToken = default);
    Task<SupplierResponseDto> UpdateSupplierAsync(Guid id, UpdateSupplierDto request, CancellationToken cancellationToken = default);
    Task<SupplierResponseDto> UpdateSupplierStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default);
}
