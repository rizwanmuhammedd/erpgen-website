using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;

namespace ERPGen.Application.Interfaces;

public interface ICustomerService
{
    Task<PaginatedResultDto<CustomerResponseDto>> GetCustomersAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    Task<CustomerResponseDto> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CustomerResponseDto> CreateCustomerAsync(CreateCustomerDto request, CancellationToken cancellationToken = default);
    Task<CustomerResponseDto> UpdateCustomerAsync(Guid id, UpdateCustomerDto request, CancellationToken cancellationToken = default);
    Task<CustomerResponseDto> UpdateCustomerStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default);
}
