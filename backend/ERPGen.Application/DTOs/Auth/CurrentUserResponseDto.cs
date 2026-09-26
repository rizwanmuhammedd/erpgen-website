namespace ERPGen.Application.DTOs.Auth;

public class CurrentUserResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public IList<string> Roles { get; set; } = new List<string>();
}
