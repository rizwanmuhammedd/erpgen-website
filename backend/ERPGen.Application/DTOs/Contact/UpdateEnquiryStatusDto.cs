using System.ComponentModel.DataAnnotations;
using ERPGen.Domain.Enums;

namespace ERPGen.Application.DTOs.Contact;

public class UpdateEnquiryStatusDto
{
    [Required]
    public EnquiryStatus Status { get; set; }
}
