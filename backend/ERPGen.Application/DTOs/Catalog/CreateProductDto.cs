using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Catalog;

public class CreateProductDto
{
    [Required(ErrorMessage = "Product name is required.")]
    [MaxLength(200, ErrorMessage = "Product name cannot exceed 200 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "SKU is required.")]
    [MaxLength(100, ErrorMessage = "SKU cannot exceed 100 characters.")]
    public string SKU { get; set; } = string.Empty;

    [MaxLength(2000, ErrorMessage = "Description cannot exceed 2000 characters.")]
    public string? Description { get; set; }

    public Guid? CategoryId { get; set; }

    [Required(ErrorMessage = "Unit is required.")]
    [MaxLength(50, ErrorMessage = "Unit cannot exceed 50 characters.")]
    public string Unit { get; set; } = "Piece";

    [Range(0, 9999999999999999.99, ErrorMessage = "Cost price must be greater than or equal to 0.")]
    public decimal CostPrice { get; set; }

    [Range(0, 9999999999999999.99, ErrorMessage = "Selling price must be greater than or equal to 0.")]
    public decimal SellingPrice { get; set; }
}
