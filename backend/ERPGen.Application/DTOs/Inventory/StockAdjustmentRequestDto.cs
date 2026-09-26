using System.ComponentModel.DataAnnotations;
using ERPGen.Domain.Enums;

namespace ERPGen.Application.DTOs.Inventory;

public class StockAdjustmentRequestDto
{
    [Required(ErrorMessage = "Product ID is required.")]
    public Guid ProductId { get; set; }

    [Required(ErrorMessage = "Warehouse ID is required.")]
    public Guid WarehouseId { get; set; }

    [Range(0.001, 999999999999.999, ErrorMessage = "Quantity must be greater than 0.")]
    public decimal Quantity { get; set; }

    [Required(ErrorMessage = "Direction is required ('In' or 'Out').")]
    [RegularExpression("^(In|Out)$", ErrorMessage = "Direction must be either 'In' or 'Out'.")]
    public string Direction { get; set; } = "In";

    [Required(ErrorMessage = "Reason is required.")]
    [MaxLength(500, ErrorMessage = "Reason cannot exceed 500 characters.")]
    public string Reason { get; set; } = string.Empty;

    public StockMovementType? MovementType { get; set; }

    [MaxLength(100)]
    public string? ReferenceType { get; set; }

    [MaxLength(100)]
    public string? ReferenceId { get; set; }
}
