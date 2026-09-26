using ERPGen.Domain.Enums;

namespace ERPGen.Application.DTOs.Inventory;

public class StockMovementResponseDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductSKU { get; set; } = string.Empty;
    public string ProductUnit { get; set; } = string.Empty;
    public Guid WarehouseId { get; set; }
    public string WarehouseName { get; set; } = string.Empty;
    public string WarehouseCode { get; set; } = string.Empty;
    public StockMovementType MovementType { get; set; }
    public decimal Quantity { get; set; }
    public decimal BalanceAfter { get; set; }
    public string? ReferenceType { get; set; }
    public string? ReferenceId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? CreatedByUserId { get; set; }
    public string? CreatedByUserName { get; set; }
}
