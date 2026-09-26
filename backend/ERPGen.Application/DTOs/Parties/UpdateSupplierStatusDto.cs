using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Parties;

public class UpdateSupplierStatusDto
{
    [Required]
    public bool IsActive { get; set; }
}
