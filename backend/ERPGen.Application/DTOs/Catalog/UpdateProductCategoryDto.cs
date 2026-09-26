using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Catalog;

public class UpdateProductCategoryDto
{
    [Required(ErrorMessage = "Category name is required.")]
    [MaxLength(150, ErrorMessage = "Category name cannot exceed 150 characters.")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
    public string? Description { get; set; }

    public bool IsActive { get; set; } = true;
}
