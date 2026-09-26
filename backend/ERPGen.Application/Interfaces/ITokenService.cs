using System.Security.Claims;
using ERPGen.Domain.Entities;

namespace ERPGen.Application.Interfaces;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt, string JwtId) GenerateAccessToken(ApplicationUser user, IList<string> roles);
    (string RawToken, RefreshToken RefreshTokenEntity) GenerateRefreshToken(string userId, string jwtId);
    string HashToken(string token);
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}
