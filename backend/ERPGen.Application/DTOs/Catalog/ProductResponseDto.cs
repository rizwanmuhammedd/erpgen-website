namespace ERPGen.Application.DTOs.Catalog;

public class ProductResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Guid? CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string Unit { get; set; } = string.Empty;
    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
