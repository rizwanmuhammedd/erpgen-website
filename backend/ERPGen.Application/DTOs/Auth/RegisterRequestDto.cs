using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Auth;

public class RegisterRequestDto
{
    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    public string Password { get; set; } = string.Empty;

    [Compare(nameof(Password), ErrorMessage = "Passwords do not match.")]
    public string ConfirmPassword { get; set; } = string.Empty;
}
