namespace ERPGen.Domain.Entities;

public class StockBalance
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;

    public decimal Quantity { get; set; }

    public byte[] RowVersion { get; set; } = Array.Empty<byte>();

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
