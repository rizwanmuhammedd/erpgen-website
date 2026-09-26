using ERPGen.Application.DTOs.Common;
using ERPGen.Application.DTOs.Contact;
using ERPGen.Domain.Enums;

namespace ERPGen.Application.Interfaces;

public interface IContactService
{
    Task<ContactEnquiryResponseDto> CreateEnquiryAsync(CreateContactEnquiryDto request, string? ipAddress = null);
    Task<PaginatedResultDto<ContactEnquiryAdminResponseDto>> GetEnquiriesAsync(int page = 1, int pageSize = 20, string? search = null, EnquiryStatus? status = null);
    Task<ContactEnquiryAdminResponseDto?> GetEnquiryByIdAsync(Guid id);
    Task<ContactEnquiryAdminResponseDto?> UpdateEnquiryStatusAsync(Guid id, EnquiryStatus status);
}
