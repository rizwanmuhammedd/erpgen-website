namespace ERPGen.Application.DTOs.Inventory;

public class WarehouseResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int TotalProductsInStock { get; set; }
    public decimal TotalStockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
