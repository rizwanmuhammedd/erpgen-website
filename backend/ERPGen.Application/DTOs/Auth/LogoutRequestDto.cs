using System.ComponentModel.DataAnnotations;

namespace ERPGen.Application.DTOs.Auth;

public class LogoutRequestDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
