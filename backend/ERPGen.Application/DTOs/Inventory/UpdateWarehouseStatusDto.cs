using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Inventory;

public class UpdateWarehouseStatusDto
{
    [Required]
    public bool IsActive { get; set; }
}
