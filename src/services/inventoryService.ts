import { API_BASE_URL } from '../config/api';

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  isActive: boolean;
  totalProductsInStock: number;
  totalStockQuantity: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateWarehousePayload {
  name: string;
  code: string;
  description?: string | null;
}

export interface UpdateWarehousePayload {
  name: string;
  code: string;
  description?: string | null;
  isActive: boolean;
}

export interface StockBalance {
  id: string;
  productId: string;
  productName: string;
  productSKU: string;
  productUnit: string;
  warehouseId: string;
  warehouseName: string;
  warehouseCode: string;
  quantity: number;
  updatedAt: string;
}

export interface StockAdjustmentPayload {
  productId: string;
  warehouseId: string;
  quantity: number;
  direction: 'In' | 'Out';
  reason: string;
  movementType?: number;
  referenceType?: string;
  referenceId?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  productSKU: string;
  productUnit: string;
  warehouseId: string;
  warehouseName: string;
  warehouseCode: string;
  movementType: number | string;
  quantity: number;
  balanceAfter: number;
  referenceType?: string | null;
  referenceId?: string | null;
  reason: string;
  createdAt: string;
  createdByUserId?: string | null;
  createdByUserName?: string | null;
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
// Warehouse APIs
// ----------------------------------------------------
export const getAdminWarehouses = async (
  token: string,
  search?: string,
  isActive?: boolean
): Promise<Warehouse[]> => {
  const params = new URLSearchParams();
  if (search && search.trim()) params.append('search', search.trim());
  if (isActive !== undefined) params.append('isActive', isActive.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/warehouses${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load warehouses.');
  }

  return response.json();
};

export const getAdminWarehouseById = async (
  id: string,
  token: string
): Promise<Warehouse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/warehouses/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load warehouse details.');
  }

  return response.json();
};

export const createAdminWarehouse = async (
  payload: CreateWarehousePayload,
  token: string
): Promise<Warehouse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/warehouses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to create warehouse.');
  }

  return response.json();
};

export const updateAdminWarehouse = async (
  id: string,
  payload: UpdateWarehousePayload,
  token: string
): Promise<Warehouse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/warehouses/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update warehouse.');
  }

  return response.json();
};

export const updateAdminWarehouseStatus = async (
  id: string,
  isActive: boolean,
  token: string
): Promise<Warehouse> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/warehouses/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to update warehouse status.');
  }

  return response.json();
};

// ----------------------------------------------------
// Stock & Inventory APIs
// ----------------------------------------------------
export const getAdminStockBalances = async (
  filters: { page?: number; pageSize?: number; search?: string; warehouseId?: string },
  token: string
): Promise<PaginatedResult<StockBalance>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());
  if (filters.warehouseId && filters.warehouseId !== 'All') {
    params.append('warehouseId', filters.warehouseId);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/inventory/stock${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load stock balances.');
  }

  return response.json();
};

export const getAdminSingleStockBalance = async (
  productId: string,
  warehouseId: string,
  token: string
): Promise<StockBalance> => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/inventory/stock/${productId}/${warehouseId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response, 'Failed to load stock balance.');
  }

  return response.json();
};

export const adjustAdminStock = async (
  payload: StockAdjustmentPayload,
  token: string
): Promise<{ stockBalance: StockBalance; stockMovement: StockMovement }> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/inventory/adjustments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to execute stock adjustment.');
  }

  return response.json();
};

export const getAdminStockMovements = async (
  filters: {
    page?: number;
    pageSize?: number;
    productId?: string;
    warehouseId?: string;
    movementType?: number | string;
  },
  token: string
): Promise<PaginatedResult<StockMovement>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.productId && filters.productId !== 'All') {
    params.append('productId', filters.productId);
  }
  if (filters.warehouseId && filters.warehouseId !== 'All') {
    params.append('warehouseId', filters.warehouseId);
  }
  if (filters.movementType !== undefined && filters.movementType !== 'All') {
    params.append('movementType', filters.movementType.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';

  const response = await fetch(`${API_BASE_URL}/api/admin/inventory/movements${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response, 'Failed to load stock movements.');
  }

  return response.json();
};
