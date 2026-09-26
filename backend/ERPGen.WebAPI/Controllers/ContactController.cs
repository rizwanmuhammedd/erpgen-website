using ERPGen.Application.DTOs.Contact;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    /// <summary>
    /// Submit a public contact or consultation enquiry.
    /// Client IP address is safely resolved server-side and never exposed in the response.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ContactEnquiryResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SubmitEnquiry([FromBody] CreateContactEnquiryDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var clientIp = ResolveClientIp();
            var result = await _contactService.CreateEnquiryAsync(request, clientIp);
            return StatusCode(StatusCodes.Status201Created, result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while processing your enquiry. Please try again later."
            });
        }
    }

    private string? ResolveClientIp()
    {
        var remoteIp = HttpContext.Connection.RemoteIpAddress;
        if (remoteIp == null)
        {
            return null;
        }

        // Normalize IPv4-mapped IPv6 addresses (e.g. ::ffff:192.0.2.1 -> 192.0.2.1)
        if (remoteIp.IsIPv4MappedToIPv6)
        {
            return remoteIp.MapToIPv4().ToString();
        }

        return remoteIp.ToString();
    }
}
