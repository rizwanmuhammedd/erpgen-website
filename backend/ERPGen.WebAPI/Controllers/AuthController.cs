using System.Security.Claims;
using ERPGen.Application.DTOs.Auth;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Register a new user account.
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Authenticate user and issue access and refresh tokens.
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            var result = await _authService.LoginAsync(request);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Issue a new access token using a valid refresh token (Refresh Token Exchange / Rotation).
    /// </summary>
    [HttpPost("refresh")]
    [HttpPost("refresh-token")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto request)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Invalidate server-side refresh token session (Logout).
    /// </summary>
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Logout([FromBody] LogoutRequestDto request)
    {
        var result = await _authService.LogoutAsync(request);
        if (!result)
        {
            return BadRequest(new { message = "Invalid token or session already terminated." });
        }
        return Ok(new { message = "Logged out successfully. Server session invalidated." });
    }

    /// <summary>
    /// Get details of currently authenticated user.
    /// </summary>
    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType(typeof(CurrentUserResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "User identifier claim not found in token." });
        }

        var user = await _authService.GetCurrentUserAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        return Ok(user);
    }
}
