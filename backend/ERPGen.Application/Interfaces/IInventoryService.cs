using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Inventory;
using ERPGen.Domain.Enums;

namespace ERPGen.Application.Interfaces;

public interface IInventoryService
{
    Task<PaginatedResultDto<StockBalanceResponseDto>> GetStockBalancesAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        Guid? warehouseId = null,
        CancellationToken cancellationToken = default);

    Task<StockBalanceResponseDto> GetStockBalanceAsync(
        Guid productId,
        Guid warehouseId,
        CancellationToken cancellationToken = default);

    Task<StockAdjustmentResponseDto> AdjustStockAsync(
        StockAdjustmentRequestDto request,
        string? userId = null,
        CancellationToken cancellationToken = default);

    Task<PaginatedResultDto<StockMovementResponseDto>> GetStockMovementsAsync(
        int page = 1,
        int pageSize = 20,
        Guid? productId = null,
        Guid? warehouseId = null,
        StockMovementType? movementType = null,
        CancellationToken cancellationToken = default);
}
