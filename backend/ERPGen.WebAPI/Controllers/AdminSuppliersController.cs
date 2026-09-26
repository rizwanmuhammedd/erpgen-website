using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/suppliers")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminSuppliersController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public AdminSuppliersController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    /// <summary>
    /// Get paginated suppliers with optional search and active status filter (Admin only).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResultDto<SupplierResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetSuppliers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        var result = await _supplierService.GetSuppliersAsync(page, pageSize, search, isActive, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get supplier by ID (Admin only).
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(SupplierResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var supplier = await _supplierService.GetSupplierByIdAsync(id, cancellationToken);
            return Ok(supplier);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create a new supplier record (Admin only).
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(SupplierResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateSupplierDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _supplierService.CreateSupplierAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing supplier record (Admin only).
    /// </summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(SupplierResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSupplierDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _supplierService.UpdateSupplierAsync(id, request, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Toggle active status for a supplier (Admin only).
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(typeof(SupplierResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateSupplierStatusDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _supplierService.UpdateSupplierStatusAsync(id, request.IsActive, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }
}
