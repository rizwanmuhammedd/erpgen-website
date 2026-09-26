using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Contact;
using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Domain.Enums;
using ERPGen.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Services;

public class ContactService : IContactService
{
    private readonly ApplicationDbContext _context;

    public ContactService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ContactEnquiryResponseDto> CreateEnquiryAsync(CreateContactEnquiryDto request, string? ipAddress = null)
    {
        string? sanitizedIp = null;
        if (!string.IsNullOrWhiteSpace(ipAddress))
        {
            var trimmed = ipAddress.Trim();
            sanitizedIp = trimmed.Length > 50 ? trimmed[..50] : trimmed;
        }

        var enquiry = new ContactEnquiry
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Phone = string.IsNullOrWhiteSpace(request.Phone) ? null : request.Phone.Trim(),
            Message = request.Message.Trim(),
            IpAddress = sanitizedIp,
            Status = EnquiryStatus.New,
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactEnquiries.Add(enquiry);
        await _context.SaveChangesAsync();

        return MapToPublicDto(enquiry);
    }

    public async Task<PaginatedResultDto<ContactEnquiryAdminResponseDto>> GetEnquiriesAsync(
        int page = 1,
        int pageSize = 20,
        string? search = null,
        EnquiryStatus? status = null)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.ContactEnquiries.AsNoTracking().AsQueryable();

        // Server-side filtering
        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(e =>
                e.Name.Contains(term) ||
                e.Email.Contains(term) ||
                (e.Phone != null && e.Phone.Contains(term)) ||
                (e.IpAddress != null && e.IpAddress.Contains(term)));
        }

        if (status.HasValue)
        {
            query = query.Where(e => e.Status == status.Value);
        }

        var totalCount = await query.CountAsync();

        // Server-side pagination & sorting (newest first)
        var items = await query
            .OrderByDescending(e => e.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new ContactEnquiryAdminResponseDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                Message = e.Message,
                IpAddress = e.IpAddress,
                Status = e.Status,
                CreatedAt = e.CreatedAt,
                UpdatedAt = e.UpdatedAt
            })
            .ToListAsync();

        return new PaginatedResultDto<ContactEnquiryAdminResponseDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<ContactEnquiryAdminResponseDto?> GetEnquiryByIdAsync(Guid id)
    {
        var enquiry = await _context.ContactEnquiries
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id);

        return enquiry == null ? null : MapToAdminDto(enquiry);
    }

    public async Task<ContactEnquiryAdminResponseDto?> UpdateEnquiryStatusAsync(Guid id, EnquiryStatus status)
    {
        var enquiry = await _context.ContactEnquiries.FirstOrDefaultAsync(e => e.Id == id);
        if (enquiry == null)
        {
            return null;
        }

        enquiry.Status = status;
        enquiry.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapToAdminDto(enquiry);
    }

    private static ContactEnquiryResponseDto MapToPublicDto(ContactEnquiry enquiry) =>
        new()
        {
            Id = enquiry.Id,
            Name = enquiry.Name,
            Email = enquiry.Email,
            Phone = enquiry.Phone,
            Message = enquiry.Message,
            Status = enquiry.Status,
            CreatedAt = enquiry.CreatedAt,
            UpdatedAt = enquiry.UpdatedAt
        };

    private static ContactEnquiryAdminResponseDto MapToAdminDto(ContactEnquiry enquiry) =>
        new()
        {
            Id = enquiry.Id,
            Name = enquiry.Name,
            Email = enquiry.Email,
            Phone = enquiry.Phone,
            Message = enquiry.Message,
            IpAddress = enquiry.IpAddress,
            Status = enquiry.Status,
            CreatedAt = enquiry.CreatedAt,
            UpdatedAt = enquiry.UpdatedAt
        };
}
