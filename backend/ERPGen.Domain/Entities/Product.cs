namespace ERPGen.Domain.Entities;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string? Description { get; set; }

    public Guid? CategoryId { get; set; }
    public ProductCategory? Category { get; set; }

    public string Unit { get; set; } = "pcs";
    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }

    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public ICollection<StockBalance> StockBalances { get; set; } = new List<StockBalance>();
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
