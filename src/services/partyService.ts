import { API_BASE_URL } from '../config/api';

export interface Customer {
  id: string;
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateCustomerPayload {
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
}

export interface UpdateCustomerPayload {
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
  isActive: boolean;
}

export interface CreateSupplierPayload {
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
}

export interface UpdateSupplierPayload {
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  taxNumber?: string | null;
  notes?: string | null;
  isActive: boolean;
}

export interface PartyFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean | string;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

async function handleApiError(response: Response, defaultMsg: string): Promise<never> {
  let errorMessage = defaultMsg;
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
    // Keep default
  }
  throw new Error(errorMessage);
}

// ----------------------------------------------------
// Customer APIs
// ----------------------------------------------------
export const getAdminCustomers = async (
  filters: PartyFilters,
  token: string
): Promise<PaginatedResult<Customer>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());
  if (filters.isActive !== undefined && filters.isActive !== '' && filters.isActive !== 'All') {
    params.append('isActive', filters.isActive.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/customers${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load customers.');
  }

  return response.json();
};

export const getAdminCustomerById = async (
  id: string,
  token: string
): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/customers/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load customer details.');
  }

  return response.json();
};

export const createAdminCustomer = async (
  payload: CreateCustomerPayload,
  token: string
): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/customers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to create customer.');
  }

  return response.json();
};

export const updateAdminCustomer = async (
  id: string,
  payload: UpdateCustomerPayload,
  token: string
): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/customers/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update customer.');
  }

  return response.json();
};

export const updateAdminCustomerStatus = async (
  id: string,
  isActive: boolean,
  token: string
): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/customers/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update customer status.');
  }

  return response.json();
};

// ----------------------------------------------------
// Supplier APIs
// ----------------------------------------------------
export const getAdminSuppliers = async (
  filters: PartyFilters,
  token: string
): Promise<PaginatedResult<Supplier>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());
  if (filters.isActive !== undefined && filters.isActive !== '' && filters.isActive !== 'All') {
    params.append('isActive', filters.isActive.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/suppliers${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load suppliers.');
  }

  return response.json();
};

export const getAdminSupplierById = async (
  id: string,
  token: string
): Promise<Supplier> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/suppliers/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load supplier details.');
  }

  return response.json();
};

export const createAdminSupplier = async (
  payload: CreateSupplierPayload,
  token: string
): Promise<Supplier> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/suppliers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to create supplier.');
  }

  return response.json();
};

export const updateAdminSupplier = async (
  id: string,
  payload: UpdateSupplierPayload,
  token: string
): Promise<Supplier> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/suppliers/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update supplier.');
  }

  return response.json();
};

export const updateAdminSupplierStatus = async (
  id: string,
  isActive: boolean,
  token: string
): Promise<Supplier> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/suppliers/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update supplier status.');
  }

  return response.json();
};
