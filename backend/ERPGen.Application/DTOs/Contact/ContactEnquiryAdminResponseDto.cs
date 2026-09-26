using ERPGen.Domain.Enums;

namespace ERPGen.Application.DTOs.Contact;

public class ContactEnquiryAdminResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? IpAddress { get; set; }
    public EnquiryStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
