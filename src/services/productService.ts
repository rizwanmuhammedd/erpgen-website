import { API_BASE_URL } from '../config/api';

export interface ProductCategory {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryPayload {
  name: string;
  description?: string | null;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateProductPayload {
  name: string;
  sku: string;
  description?: string | null;
  categoryId?: string | null;
  unit: string;
  costPrice: number;
  sellingPrice: number;
}

export interface UpdateProductPayload {
  name: string;
  sku: string;
  description?: string | null;
  categoryId?: string | null;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  isActive: boolean;
}

export interface AdminProductFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  isActive?: boolean | string;
}

export interface PaginatedProducts<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// Helper to extract detailed error messages from API response
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
    // Keep default message
  }
  throw new Error(errorMessage);
}

// Category API calls
export const getAdminProductCategories = async (
  token: string,
  isActive?: boolean
): Promise<ProductCategory[]> => {
  const params = new URLSearchParams();
  if (isActive !== undefined) {
    params.append('isActive', isActive.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/product-categories${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load product categories.');
  }

  return response.json();
};

export const createAdminProductCategory = async (
  payload: CreateCategoryPayload,
  token: string
): Promise<ProductCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/product-categories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to create category.');
  }

  return response.json();
};

export const updateAdminProductCategory = async (
  id: string,
  payload: UpdateCategoryPayload,
  token: string
): Promise<ProductCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/product-categories/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update category.');
  }

  return response.json();
};

export const updateAdminProductCategoryStatus = async (
  id: string,
  isActive: boolean,
  token: string
): Promise<ProductCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/product-categories/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update category status.');
  }

  return response.json();
};

// Product API calls
export const getAdminProducts = async (
  filters: AdminProductFilters,
  token: string
): Promise<PaginatedProducts<Product>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());
  if (filters.categoryId && filters.categoryId !== 'All') {
    params.append('categoryId', filters.categoryId);
  }
  if (filters.isActive !== undefined && filters.isActive !== '' && filters.isActive !== 'All') {
    params.append('isActive', filters.isActive.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/products${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load products.');
  }

  return response.json();
};

export const getAdminProductById = async (
  id: string,
  token: string
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load product details.');
  }

  return response.json();
};

export const createAdminProduct = async (
  payload: CreateProductPayload,
  token: string
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to create product.');
  }

  return response.json();
};

export const updateAdminProduct = async (
  id: string,
  payload: UpdateProductPayload,
  token: string
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update product.');
  }

  return response.json();
};

export const updateAdminProductStatus = async (
  id: string,
  isActive: boolean,
  token: string
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update product status.');
  }

  return response.json();
};
