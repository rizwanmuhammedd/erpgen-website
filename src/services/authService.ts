import { API_BASE_URL } from '../config/api';

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  roles: string[];
}

export interface AuthResponse {
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

const ACCESS_TOKEN_KEY = 'erpgen_access_token';
const REFRESH_TOKEN_KEY = 'erpgen_refresh_token';
const USER_KEY = 'erpgen_user';

export const getStoredAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getStoredUser = (): UserInfo | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

export const setAuthSession = (auth: AuthResponse) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
  const user: UserInfo = {
    id: auth.userId,
    fullName: auth.fullName,
    email: auth.email,
    roles: auth.roles,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMsg = 'Invalid email or password.';
    try {
      const data = await response.json();
      if (data.message) errorMsg = data.message;
    } catch {
      // Fallback
    }
    throw new Error(errorMsg);
  }

  const authData: AuthResponse = await response.json();
  setAuthSession(authData);
  return authData;
};

export const logoutUser = async (): Promise<void> => {
  const refreshToken = getStoredRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Best-effort server notification
    }
  }
  clearAuthSession();
};

export const fetchCurrentUser = async (token: string): Promise<UserInfo> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate session.');
  }

  const user: UserInfo = await response.json();
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};
