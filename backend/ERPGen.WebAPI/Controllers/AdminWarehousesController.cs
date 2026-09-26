using ERPGen.Application.DTOs.Inventory;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/warehouses")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminWarehousesController : ControllerBase
{
    private readonly IWarehouseService _warehouseService;

    public AdminWarehousesController(IWarehouseService warehouseService)
    {
        _warehouseService = warehouseService;
    }

    /// <summary>
    /// Get all warehouses with optional search and active status filtering (Admin only).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<WarehouseResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] bool? isActive,
        CancellationToken cancellationToken)
    {
        var warehouses = await _warehouseService.GetWarehousesAsync(search, isActive, cancellationToken);
        return Ok(warehouses);
    }

    /// <summary>
    /// Get warehouse by ID (Admin only).
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(WarehouseResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var warehouse = await _warehouseService.GetWarehouseByIdAsync(id, cancellationToken);
            return Ok(warehouse);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create a new warehouse / location (Admin only).
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(WarehouseResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateWarehouseDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _warehouseService.CreateWarehouseAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing warehouse (Admin only).
    /// </summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(WarehouseResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateWarehouseDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _warehouseService.UpdateWarehouseAsync(id, request, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Toggle active status of a warehouse (Admin only).
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(typeof(WarehouseResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateWarehouseStatusDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _warehouseService.UpdateWarehouseStatusAsync(id, request.IsActive, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }
}
