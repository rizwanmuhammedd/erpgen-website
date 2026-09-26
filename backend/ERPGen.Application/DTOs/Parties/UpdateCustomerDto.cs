using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Parties;

public class UpdateCustomerDto
{
    [Required(ErrorMessage = "Customer name is required.")]
    [MaxLength(200, ErrorMessage = "Customer name cannot exceed 200 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Customer code is required.")]
    [MaxLength(50, ErrorMessage = "Customer code cannot exceed 50 characters.")]
    public string Code { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Invalid email address format.")]
    [MaxLength(256, ErrorMessage = "Email cannot exceed 256 characters.")]
    public string? Email { get; set; }

    [MaxLength(50, ErrorMessage = "Phone cannot exceed 50 characters.")]
    public string? Phone { get; set; }

    [MaxLength(500, ErrorMessage = "Address cannot exceed 500 characters.")]
    public string? Address { get; set; }

    [MaxLength(100, ErrorMessage = "City cannot exceed 100 characters.")]
    public string? City { get; set; }

    [MaxLength(100, ErrorMessage = "State cannot exceed 100 characters.")]
    public string? State { get; set; }

    [MaxLength(100, ErrorMessage = "Country cannot exceed 100 characters.")]
    public string? Country { get; set; }

    [MaxLength(100, ErrorMessage = "Tax number cannot exceed 100 characters.")]
    public string? TaxNumber { get; set; }

    [MaxLength(2000, ErrorMessage = "Notes cannot exceed 2000 characters.")]
    public string? Notes { get; set; }

    public bool IsActive { get; set; } = true;
}
