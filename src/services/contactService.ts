import { API_BASE_URL } from '../config/api';

export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactEnquiryResponse {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: number | string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface AdminContactEnquiryResponse extends ContactEnquiryResponse {
  ipAddress?: string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export const submitContactEnquiry = async (
  payload: ContactEnquiryPayload
): Promise<ContactEnquiryResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to submit enquiry. Please check your inputs and try again.';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.errors) {
        const errorList: string[] = [];
        for (const field of Object.keys(errorData.errors)) {
          if (Array.isArray(errorData.errors[field])) {
            errorList.push(...errorData.errors[field]);
          }
        }
        if (errorList.length > 0) {
          errorMessage = errorList.join(' ');
        }
      }
    } catch {
      // Fallback
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export interface AdminEnquiryFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string | number;
}

export const getAdminContactEnquiries = async (
  filters: AdminEnquiryFilters,
  token: string
): Promise<PaginatedResult<AdminContactEnquiryResponse>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());
  if (filters.status !== undefined && filters.status !== '' && filters.status !== 'All') {
    params.append('status', filters.status.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/contact-enquiries${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication session expired. Please log in again.');
    }
    if (response.status === 403) {
      throw new Error('Access denied. Administrator role is required to view enquiries.');
    }
    throw new Error('Failed to load contact enquiries.');
  }

  return response.json();
};

export const getAdminContactEnquiryById = async (
  id: string,
  token: string
): Promise<AdminContactEnquiryResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-enquiries/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('The requested enquiry was not found.');
    }
    throw new Error('Failed to load enquiry details.');
  }

  return response.json();
};

export const updateAdminContactEnquiryStatus = async (
  id: string,
  status: string | number,
  token: string
): Promise<AdminContactEnquiryResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-enquiries/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    let message = 'Failed to update enquiry status.';
    try {
      const data = await response.json();
      if (data.message) message = data.message;
    } catch {
      // Fallback
    }
    throw new Error(message);
  }

  return response.json();
};
