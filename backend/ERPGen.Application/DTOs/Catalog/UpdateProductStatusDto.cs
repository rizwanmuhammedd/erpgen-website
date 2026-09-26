using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Catalog;

public class UpdateProductStatusDto
{
    [Required]
    public bool IsActive { get; set; }
}
