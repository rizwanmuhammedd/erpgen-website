using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ERPGen.Application.Common.Models;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ERPGen.Infrastructure.Services;

public class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;

    public TokenService(IOptions<JwtSettings> jwtOptions)
    {
        _jwtSettings = jwtOptions.Value;
    }

    public (string Token, DateTime ExpiresAt, string JwtId) GenerateAccessToken(ApplicationUser user, IList<string> roles)
    {
        var jwtId = Guid.NewGuid().ToString();
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(ClaimTypes.Name, user.FullName ?? user.UserName ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, jwtId),
            new(JwtRegisteredClaimNames.Sub, user.Id)
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenMinutes);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expiresAt,
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return (tokenHandler.WriteToken(token), expiresAt, jwtId);
    }

    public (string RawToken, RefreshToken RefreshTokenEntity) GenerateRefreshToken(string userId, string jwtId)
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        var rawToken = Convert.ToBase64String(randomBytes);

        // Compute SHA-256 hash for secure storage in database
        var tokenHash = HashToken(rawToken);

        var refreshTokenEntity = new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = tokenHash, // Store one-way hash only! Plaintext is never stored in DB.
            JwtId = jwtId,
            UserId = userId,
            IsUsed = false,
            IsRevoked = false,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenDays)
        };

        return (rawToken, refreshTokenEntity);
    }

    public string HashToken(string token)
    {
        using var sha256 = SHA256.Create();
        var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(hashBytes);
    }

    public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)),
            ValidateIssuer = true,
            ValidIssuer = _jwtSettings.Issuer,
            ValidateAudience = true,
            ValidAudience = _jwtSettings.Audience,
            ValidateLifetime = false, // Critical: extract claims even when expired
            ClockSkew = TimeSpan.Zero
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new AppException("Invalid token algorithm.", 401);
            }

            return principal;
        }
        catch (Exception ex) when (ex is not AppException)
        {
            throw new AppException($"Invalid access token: {ex.Message}", 401);
        }
    }
}
