namespace ERPGen.Application.DTOs.Inventory;

public class StockBalanceResponseDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductSKU { get; set; } = string.Empty;
    public string ProductUnit { get; set; } = string.Empty;
    public Guid WarehouseId { get; set; }
    public string WarehouseName { get; set; } = string.Empty;
    public string WarehouseCode { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public DateTime UpdatedAt { get; set; }
}
