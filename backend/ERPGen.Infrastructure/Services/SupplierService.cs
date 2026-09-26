using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class SupplierService : ISupplierService
{
    private readonly ApplicationDbContext _context;

    public SupplierService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedResultDto<SupplierResponseDto>> GetSuppliersAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.Suppliers.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(s =>
                s.Name.Contains(term) ||
                s.Code.Contains(term) ||
                (s.Email != null && s.Email.Contains(term)) ||
                (s.Phone != null && s.Phone.Contains(term)) ||
                (s.TaxNumber != null && s.TaxNumber.Contains(term)));
        }

        if (isActive.HasValue)
        {
            query = query.Where(s => s.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(s => s.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(s => new SupplierResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Code = s.Code,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                City = s.City,
                State = s.State,
                Country = s.Country,
                TaxNumber = s.TaxNumber,
                Notes = s.Notes,
                IsActive = s.IsActive,
                CreatedAt = s.CreatedAt,
                UpdatedAt = s.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResultDto<SupplierResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<SupplierResponseDto> GetSupplierByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var supplier = await _context.Suppliers
            .AsNoTracking()
            .Where(s => s.Id == id)
            .Select(s => new SupplierResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Code = s.Code,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                City = s.City,
                State = s.State,
                Country = s.Country,
                TaxNumber = s.TaxNumber,
                Notes = s.Notes,
                IsActive = s.IsActive,
                CreatedAt = s.CreatedAt,
                UpdatedAt = s.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (supplier == null)
        {
            throw new AppException("Supplier not found.", 404);
        }

        return supplier;
    }

    public async Task<SupplierResponseDto> CreateSupplierAsync(CreateSupplierDto request, CancellationToken cancellationToken = default)
    {
        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();
        var normalizedCode = trimmedCode.ToLower();

        var codeExists = await _context.Suppliers
            .AnyAsync(s => s.Code.ToLower() == normalizedCode, cancellationToken);

        if (codeExists)
        {
            throw new AppException($"Supplier with code '{trimmedCode}' already exists.", 409);
        }

        var supplier = new Supplier
        {
            Id = Guid.NewGuid(),
            Name = trimmedName,
            Code = trimmedCode,
            Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim().ToLowerInvariant(),
            Phone = string.IsNullOrWhiteSpace(request.Phone) ? null : request.Phone.Trim(),
            Address = string.IsNullOrWhiteSpace(request.Address) ? null : request.Address.Trim(),
            City = string.IsNullOrWhiteSpace(request.City) ? null : request.City.Trim(),
            State = string.IsNullOrWhiteSpace(request.State) ? null : request.State.Trim(),
            Country = string.IsNullOrWhiteSpace(request.Country) ? null : request.Country.Trim(),
            TaxNumber = string.IsNullOrWhiteSpace(request.TaxNumber) ? null : request.TaxNumber.Trim(),
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Suppliers.Add(supplier);
        await _context.SaveChangesAsync(cancellationToken);

        return new SupplierResponseDto
        {
            Id = supplier.Id,
            Name = supplier.Name,
            Code = supplier.Code,
            Email = supplier.Email,
            Phone = supplier.Phone,
            Address = supplier.Address,
            City = supplier.City,
            State = supplier.State,
            Country = supplier.Country,
            TaxNumber = supplier.TaxNumber,
            Notes = supplier.Notes,
            IsActive = supplier.IsActive,
            CreatedAt = supplier.CreatedAt,
            UpdatedAt = supplier.UpdatedAt
        };
    }

    public async Task<SupplierResponseDto> UpdateSupplierAsync(Guid id, UpdateSupplierDto request, CancellationToken cancellationToken = default)
    {
        var supplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

        if (supplier == null)
        {
            throw new AppException("Supplier not found.", 404);
        }

        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();
        var normalizedCode = trimmedCode.ToLower();

        var duplicateCode = await _context.Suppliers
            .AnyAsync(s => s.Id != id && s.Code.ToLower() == normalizedCode, cancellationToken);

        if (duplicateCode)
        {
            throw new AppException($"Supplier with code '{trimmedCode}' already exists.", 409);
        }

        supplier.Name = trimmedName;
        supplier.Code = trimmedCode;
        supplier.Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim().ToLowerInvariant();
        supplier.Phone = string.IsNullOrWhiteSpace(request.Phone) ? null : request.Phone.Trim();
        supplier.Address = string.IsNullOrWhiteSpace(request.Address) ? null : request.Address.Trim();
        supplier.City = string.IsNullOrWhiteSpace(request.City) ? null : request.City.Trim();
        supplier.State = string.IsNullOrWhiteSpace(request.State) ? null : request.State.Trim();
        supplier.Country = string.IsNullOrWhiteSpace(request.Country) ? null : request.Country.Trim();
        supplier.TaxNumber = string.IsNullOrWhiteSpace(request.TaxNumber) ? null : request.TaxNumber.Trim();
        supplier.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        supplier.IsActive = request.IsActive;
        supplier.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new SupplierResponseDto
        {
            Id = supplier.Id,
            Name = supplier.Name,
            Code = supplier.Code,
            Email = supplier.Email,
            Phone = supplier.Phone,
            Address = supplier.Address,
            City = supplier.City,
            State = supplier.State,
            Country = supplier.Country,
            TaxNumber = supplier.TaxNumber,
            Notes = supplier.Notes,
            IsActive = supplier.IsActive,
            CreatedAt = supplier.CreatedAt,
            UpdatedAt = supplier.UpdatedAt
        };
    }

    public async Task<SupplierResponseDto> UpdateSupplierStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default)
    {
        var supplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

        if (supplier == null)
        {
            throw new AppException("Supplier not found.", 404);
        }

        supplier.IsActive = isActive;
        supplier.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new SupplierResponseDto
        {
            Id = supplier.Id,
            Name = supplier.Name,
            Code = supplier.Code,
            Email = supplier.Email,
            Phone = supplier.Phone,
            Address = supplier.Address,
            City = supplier.City,
            State = supplier.State,
            Country = supplier.Country,
            TaxNumber = supplier.TaxNumber,
            Notes = supplier.Notes,
            IsActive = supplier.IsActive,
            CreatedAt = supplier.CreatedAt,
            UpdatedAt = supplier.UpdatedAt
        };
    }
}
