using ERPGen.Domain.Enums;

namespace ERPGen.Domain.Entities;

public class StockMovement
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;

    public StockMovementType MovementType { get; set; }

    public decimal Quantity { get; set; }
    public decimal BalanceAfter { get; set; }

    public string? ReferenceType { get; set; }
    public string? ReferenceId { get; set; }

    public string Reason { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string? CreatedByUserId { get; set; }
    public ApplicationUser? CreatedByUser { get; set; }
}
