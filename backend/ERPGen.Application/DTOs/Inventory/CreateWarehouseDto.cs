using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Inventory;

public class CreateWarehouseDto
{
    [Required(ErrorMessage = "Warehouse name is required.")]
    [MaxLength(150, ErrorMessage = "Warehouse name cannot exceed 150 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Warehouse code is required.")]
    [MaxLength(50, ErrorMessage = "Warehouse code cannot exceed 50 characters.")]
    public string Code { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
    public string? Description { get; set; }
}
