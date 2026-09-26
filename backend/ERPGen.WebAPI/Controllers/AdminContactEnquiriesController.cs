using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Contact;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/contact-enquiries")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminContactEnquiriesController : ControllerBase
{
    private readonly IContactService _contactService;

    public AdminContactEnquiriesController(IContactService contactService)
    {
        _contactService = contactService;
    }

    /// <summary>
    /// Retrieve paginated contact enquiries with optional search, IP search, and status filtering (Admin only).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResultDto<ContactEnquiryAdminResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetEnquiries(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] EnquiryStatus? status = null)
    {
        var result = await _contactService.GetEnquiriesAsync(page, pageSize, search, status);
        return Ok(result);
    }

    /// <summary>
    /// Get single contact enquiry details with client IP by ID (Admin only).
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ContactEnquiryAdminResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var enquiry = await _contactService.GetEnquiryByIdAsync(id);
        if (enquiry == null)
        {
            return NotFound(new { message = $"Contact enquiry with ID '{id}' was not found." });
        }

        return Ok(enquiry);
    }

    /// <summary>
    /// Update status of a contact enquiry (Admin only).
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(typeof(ContactEnquiryAdminResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus(
        [FromRoute] Guid id,
        [FromBody] UpdateEnquiryStatusDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!Enum.IsDefined(typeof(EnquiryStatus), request.Status))
        {
            return BadRequest(new { message = "Invalid enquiry status value." });
        }

        var updated = await _contactService.UpdateEnquiryStatusAsync(id, request.Status);
        if (updated == null)
        {
            return NotFound(new { message = $"Contact enquiry with ID '{id}' was not found." });
        }

        return Ok(updated);
    }
}
