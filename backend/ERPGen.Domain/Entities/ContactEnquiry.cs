using ERPGen.Domain.Enums;

namespace ERPGen.Domain.Entities;

public class ContactEnquiry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? IpAddress { get; set; }
    public EnquiryStatus Status { get; set; } = EnquiryStatus.New;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
