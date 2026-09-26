using ERPGen.Application.DTOs.Catalog;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPGen.WebAPI.Controllers;

[ApiController]
[Route("api/admin/product-categories")]
[Authorize(Roles = UserRoles.Admin)]
public class AdminProductCategoriesController : ControllerBase
{
    private readonly IProductCategoryService _categoryService;

    public AdminProductCategoriesController(IProductCategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    /// <summary>
    /// Get all product categories with optional active status filtering (Admin only).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ProductCategoryResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAll([FromQuery] bool? isActive, CancellationToken cancellationToken)
    {
        var categories = await _categoryService.GetCategoriesAsync(isActive, cancellationToken);
        return Ok(categories);
    }

    /// <summary>
    /// Get product category by ID (Admin only).
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ProductCategoryResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var category = await _categoryService.GetCategoryByIdAsync(id, cancellationToken);
            return Ok(category);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create a new product category (Admin only).
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductCategoryResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateProductCategoryDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _categoryService.CreateCategoryAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing product category (Admin only).
    /// </summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ProductCategoryResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateProductCategoryDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _categoryService.UpdateCategoryAsync(id, request, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Toggle active status for a product category (Admin only).
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(typeof(ProductCategoryResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateProductStatusDto request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _categoryService.UpdateCategoryStatusAsync(id, request.IsActive, cancellationToken);
            return Ok(result);
        }
        catch (AppException ex)
        {
            return StatusCode(ex.StatusCode, new { message = ex.Message });
        }
    }
}
