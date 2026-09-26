using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Parties;

public class UpdateCustomerStatusDto
{
    [Required]
    public bool IsActive { get; set; }
}
