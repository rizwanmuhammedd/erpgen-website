using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Parties;
using ERPGen.Application.Exceptions;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class CustomerService : ICustomerService
{
    private readonly ApplicationDbContext _context;

    public CustomerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedResultDto<CustomerResponseDto>> GetCustomersAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.Customers.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(c =>
                c.Name.Contains(term) ||
                c.Code.Contains(term) ||
                (c.Email != null && c.Email.Contains(term)) ||
                (c.Phone != null && c.Phone.Contains(term)) ||
                (c.TaxNumber != null && c.TaxNumber.Contains(term)));
        }

        if (isActive.HasValue)
        {
            query = query.Where(c => c.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CustomerResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Code = c.Code,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address,
                City = c.City,
                State = c.State,
                Country = c.Country,
                TaxNumber = c.TaxNumber,
                Notes = c.Notes,
                IsActive = c.IsActive,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResultDto<CustomerResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<CustomerResponseDto> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var customer = await _context.Customers
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new CustomerResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Code = c.Code,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address,
                City = c.City,
                State = c.State,
                Country = c.Country,
                TaxNumber = c.TaxNumber,
                Notes = c.Notes,
                IsActive = c.IsActive,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (customer == null)
        {
            throw new AppException("Customer not found.", 404);
        }

        return customer;
    }

    public async Task<CustomerResponseDto> CreateCustomerAsync(CreateCustomerDto request, CancellationToken cancellationToken = default)
    {
        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();
        var normalizedCode = trimmedCode.ToLower();

        var codeExists = await _context.Customers
            .AnyAsync(c => c.Code.ToLower() == normalizedCode, cancellationToken);

        if (codeExists)
        {
            throw new AppException($"Customer with code '{trimmedCode}' already exists.", 409);
        }

        var customer = new Customer
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

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync(cancellationToken);

        return new CustomerResponseDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Code = customer.Code,
            Email = customer.Email,
            Phone = customer.Phone,
            Address = customer.Address,
            City = customer.City,
            State = customer.State,
            Country = customer.Country,
            TaxNumber = customer.TaxNumber,
            Notes = customer.Notes,
            IsActive = customer.IsActive,
            CreatedAt = customer.CreatedAt,
            UpdatedAt = customer.UpdatedAt
        };
    }

    public async Task<CustomerResponseDto> UpdateCustomerAsync(Guid id, UpdateCustomerDto request, CancellationToken cancellationToken = default)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

        if (customer == null)
        {
            throw new AppException("Customer not found.", 404);
        }

        var trimmedName = request.Name.Trim();
        var trimmedCode = request.Code.Trim().ToUpperInvariant();
        var normalizedCode = trimmedCode.ToLower();

        var duplicateCode = await _context.Customers
            .AnyAsync(c => c.Id != id && c.Code.ToLower() == normalizedCode, cancellationToken);

        if (duplicateCode)
        {
            throw new AppException($"Customer with code '{trimmedCode}' already exists.", 409);
        }

        customer.Name = trimmedName;
        customer.Code = trimmedCode;
        customer.Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim().ToLowerInvariant();
        customer.Phone = string.IsNullOrWhiteSpace(request.Phone) ? null : request.Phone.Trim();
        customer.Address = string.IsNullOrWhiteSpace(request.Address) ? null : request.Address.Trim();
        customer.City = string.IsNullOrWhiteSpace(request.City) ? null : request.City.Trim();
        customer.State = string.IsNullOrWhiteSpace(request.State) ? null : request.State.Trim();
        customer.Country = string.IsNullOrWhiteSpace(request.Country) ? null : request.Country.Trim();
        customer.TaxNumber = string.IsNullOrWhiteSpace(request.TaxNumber) ? null : request.TaxNumber.Trim();
        customer.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        customer.IsActive = request.IsActive;
        customer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new CustomerResponseDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Code = customer.Code,
            Email = customer.Email,
            Phone = customer.Phone,
            Address = customer.Address,
            City = customer.City,
            State = customer.State,
            Country = customer.Country,
            TaxNumber = customer.TaxNumber,
            Notes = customer.Notes,
            IsActive = customer.IsActive,
            CreatedAt = customer.CreatedAt,
            UpdatedAt = customer.UpdatedAt
        };
    }

    public async Task<CustomerResponseDto> UpdateCustomerStatusAsync(Guid id, bool isActive, CancellationToken cancellationToken = default)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

        if (customer == null)
        {
            throw new AppException("Customer not found.", 404);
        }

        customer.IsActive = isActive;
        customer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new CustomerResponseDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Code = customer.Code,
            Email = customer.Email,
            Phone = customer.Phone,
            Address = customer.Address,
            City = customer.City,
            State = customer.State,
            Country = customer.Country,
            TaxNumber = customer.TaxNumber,
            Notes = customer.Notes,
            IsActive = customer.IsActive,
            CreatedAt = customer.CreatedAt,
            UpdatedAt = customer.UpdatedAt
        };
    }
}
