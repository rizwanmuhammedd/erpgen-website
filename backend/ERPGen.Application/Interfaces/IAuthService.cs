using ERPGen.Application.DTOs.Auth;

namespace ERPGen.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request);
    Task<bool> LogoutAsync(LogoutRequestDto request);
    Task<CurrentUserResponseDto?> GetCurrentUserAsync(string userId);
}
