using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Catalog;

public class CreateProductCategoryDto
{
    [Required(ErrorMessage = "Category name is required.")]
    [MaxLength(150, ErrorMessage = "Category name cannot exceed 150 characters.")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
    public string? Description { get; set; }
}
