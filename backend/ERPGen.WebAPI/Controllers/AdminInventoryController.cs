using System.Security.Claims;
using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Inventory;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/inventory")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminInventoryController : ControllerBase
{
    private readonly IInventoryService _inventoryService;

    public AdminInventoryController(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }

    /// <summary>
    /// Get paginated stock balances with optional product search and warehouse filter (Admin only).
    /// </summary>
    [HttpGet("stock")]
    [ProducesResponseType(typeof(PaginatedResultDto<StockBalanceResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetStockBalances(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] Guid? warehouseId = null,
        CancellationToken cancellationToken = default)
    {
        var result = await _inventoryService.GetStockBalancesAsync(page, pageSize, search, warehouseId, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get single product stock balance in a specific warehouse (Admin only).
    /// Returns 0 quantity if no balance record exists yet.
    /// </summary>
    [HttpGet("stock/{productId:guid}/{warehouseId:guid}")]
    [ProducesResponseType(typeof(StockBalanceResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSingleStockBalance(
        [FromRoute] Guid productId,
        [FromRoute] Guid warehouseId,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await _inventoryService.GetStockBalanceAsync(productId, warehouseId, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Execute an atomic stock adjustment (In or Out) with audit trail and negative stock protection (Admin only).
    /// </summary>
    [HttpPost("adjustments")]
    [ProducesResponseType(typeof(StockAdjustmentResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> AdjustStock(
        [FromBody] StockAdjustmentRequestDto request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _inventoryService.AdjustStockAsync(request, userId, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Get paginated stock movement audit history (Admin only).
    /// </summary>
    [HttpGet("movements")]
    [ProducesResponseType(typeof(PaginatedResultDto<StockMovementResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetStockMovements(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] Guid? productId = null,
        [FromQuery] Guid? warehouseId = null,
        [FromQuery] StockMovementType? movementType = null,
        CancellationToken cancellationToken = default)
    {
        var result = await _inventoryService.GetStockMovementsAsync(page, pageSize, productId, warehouseId, movementType, cancellationToken);
        return Ok(result);
    }
}
