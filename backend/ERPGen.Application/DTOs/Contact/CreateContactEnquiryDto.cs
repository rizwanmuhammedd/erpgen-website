using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Contact;

public class CreateContactEnquiryDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(150, ErrorMessage = "Name cannot exceed 150 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Please provide a valid email address.")]
    [MaxLength(256, ErrorMessage = "Email cannot exceed 256 characters.")]
    public string Email { get; set; } = string.Empty;

    [MaxLength(50, ErrorMessage = "Phone number cannot exceed 50 characters.")]
    public string? Phone { get; set; }

    [Required(ErrorMessage = "Message is required.")]
    [MaxLength(4000, ErrorMessage = "Message cannot exceed 4000 characters.")]
    public string Message { get; set; } = string.Empty;
}
