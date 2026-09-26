using ERPGen.Application.DTOs.Inventory;

namespace ERPGen.Application.Interfaces;

public interface IWarehouseService
{
    Task<IReadOnlyList<WarehouseResponseDto>> GetWarehousesAsync(
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    Task<WarehouseResponseDto> GetWarehouseByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<WarehouseResponseDto> CreateWarehouseAsync(CreateWarehouseDto request, CancellationToken cancellationToken = default);
    Task<WarehouseResponseDto> UpdateWarehouseAsync(Guid id, UpdateWarehouseDto request, CancellationToken cancellationToken = default);
    Task<WarehouseResponseDto> UpdateWarehouseStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default);
}
