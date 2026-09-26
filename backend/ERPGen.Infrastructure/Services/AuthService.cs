using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ERPGen.Application.DTOs.Auth;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Domain.Enums;
using ERPGen.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext context,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new AppException("An account with this email address already exists.", 409);
        }

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName,
            CreatedAt = DateTime.UtcNow
        };

        var createResult = await _userManager.CreateAsync(user, request.Password);
        if (!createResult.Succeeded)
        {
            var errors = string.Join("; ", createResult.Errors.Select(e => e.Description));
            throw new AppException($"Registration failed: {errors}", 400);
        }

        // Assign default User role
        await _userManager.AddToRoleAsync(user, UserRoles.User);

        var roles = await _userManager.GetRolesAsync(user);
        var (accessToken, accessExpires, jwtId) = _tokenService.GenerateAccessToken(user, roles);
        var (rawRefreshToken, refreshTokenEntity) = _tokenService.GenerateRefreshToken(user.Id, jwtId);

        _context.RefreshTokens.Add(refreshTokenEntity);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            UserId = user.Id,
            Email = user.Email ?? string.Empty,
            FullName = user.FullName ?? string.Empty,
            Roles = roles,
            AccessToken = accessToken,
            AccessTokenExpiresAt = accessExpires,
            RefreshToken = rawRefreshToken,
            RefreshTokenExpiresAt = refreshTokenEntity.ExpiresAt
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new AppException("Invalid email or password.", 401);
        }

        var roles = await _userManager.GetRolesAsync(user);
        var (accessToken, accessExpires, jwtId) = _tokenService.GenerateAccessToken(user, roles);
        var (rawRefreshToken, refreshTokenEntity) = _tokenService.GenerateRefreshToken(user.Id, jwtId);

        _context.RefreshTokens.Add(refreshTokenEntity);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            UserId = user.Id,
            Email = user.Email ?? string.Empty,
            FullName = user.FullName ?? string.Empty,
            Roles = roles,
            AccessToken = accessToken,
            AccessTokenExpiresAt = accessExpires,
            RefreshToken = rawRefreshToken,
            RefreshTokenExpiresAt = refreshTokenEntity.ExpiresAt
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request)
    {
        var principal = _tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        if (principal == null)
        {
            throw new AppException("Invalid access token.", 401);
        }

        var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            throw new AppException("Invalid access token claims.", 401);
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new AppException("User no longer exists.", 404);
        }

        var jwtId = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti)?.Value;

        // Hash the incoming refresh token to match against the hashed storage in DB
        var tokenHash = _tokenService.HashToken(request.RefreshToken);

        var existingRefreshToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(r => r.Token == tokenHash);

        if (existingRefreshToken == null)
        {
            throw new AppException("Invalid refresh token.", 401);
        }

        if (existingRefreshToken.IsRevoked)
        {
            throw new AppException("Refresh token has been revoked.", 401);
        }

        if (existingRefreshToken.IsUsed)
        {
            throw new AppException("Refresh token has already been used.", 401);
        }

        if (DateTime.UtcNow >= existingRefreshToken.ExpiresAt)
        {
            throw new AppException("Refresh token has expired.", 401);
        }

        if (existingRefreshToken.UserId != user.Id)
        {
            throw new AppException("Refresh token does not belong to the user.", 401);
        }

        if (!string.IsNullOrEmpty(jwtId) && existingRefreshToken.JwtId != jwtId)
        {
            throw new AppException("Refresh token does not match access token.", 401);
        }

        // Invalidate current refresh token
        existingRefreshToken.IsUsed = true;

        // Generate a new access token and rotated refresh token
        var roles = await _userManager.GetRolesAsync(user);
        var (newAccessToken, newAccessExpires, newJwtId) = _tokenService.GenerateAccessToken(user, roles);
        var (newRawRefreshToken, newRefreshTokenEntity) = _tokenService.GenerateRefreshToken(user.Id, newJwtId);

        _context.RefreshTokens.Add(newRefreshTokenEntity);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            UserId = user.Id,
            Email = user.Email ?? string.Empty,
            FullName = user.FullName ?? string.Empty,
            Roles = roles,
            AccessToken = newAccessToken,
            AccessTokenExpiresAt = newAccessExpires,
            RefreshToken = newRawRefreshToken,
            RefreshTokenExpiresAt = newRefreshTokenEntity.ExpiresAt
        };
    }

    public async Task<bool> LogoutAsync(LogoutRequestDto request)
    {
        var tokenHash = _tokenService.HashToken(request.RefreshToken);
        var token = await _context.RefreshTokens
            .FirstOrDefaultAsync(r => r.Token == tokenHash);

        if (token == null)
        {
            return false;
        }

        // Invalidate the session / refresh token on the server
        token.IsRevoked = true;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<CurrentUserResponseDto?> GetCurrentUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return null;
        }

        var roles = await _userManager.GetRolesAsync(user);
        return new CurrentUserResponseDto
        {
            Id = user.Id,
            FullName = user.FullName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            Phone = user.PhoneNumber,
            Roles = roles
        };
    }
}
