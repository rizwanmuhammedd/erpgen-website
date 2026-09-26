namespace ERPGen.Application.DTOs.Inventory;

public class StockAdjustmentResponseDto
{
    public StockBalanceResponseDto StockBalance { get; set; } = null!;
    public StockMovementResponseDto StockMovement { get; set; } = null!;
}
