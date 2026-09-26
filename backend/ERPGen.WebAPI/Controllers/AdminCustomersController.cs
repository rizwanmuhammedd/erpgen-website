using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/customers")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminCustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public AdminCustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    /// <summary>
    /// Get paginated customers with optional search and active status filter (Admin only).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResultDto<CustomerResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetCustomers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        var result = await _customerService.GetCustomersAsync(page, pageSize, search, isActive, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get customer by ID (Admin only).
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var customer = await _customerService.GetCustomerByIdAsync(id, cancellationToken);
            return Ok(customer);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create a new customer record (Admin only).
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateCustomerDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _customerService.CreateCustomerAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing customer record (Admin only).
    /// </summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCustomerDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _customerService.UpdateCustomerAsync(id, request, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Toggle active status for a customer (Admin only).
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateCustomerStatusDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _customerService.UpdateCustomerStatusAsync(id, request.IsActive, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }
}
