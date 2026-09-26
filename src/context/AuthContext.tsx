import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type UserInfo,
  getStoredAccessToken,
  getStoredUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  clearAuthSession,
} from '../services/authService';

interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(getStoredUser());
  const [token, setToken] = useState<string | null>(getStoredAccessToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredAccessToken();
      if (storedToken) {
        try {
          const freshUser = await fetchCurrentUser(storedToken);
          setUser(freshUser);
          setToken(storedToken);
        } catch {
          // Token expired or invalid
          clearAuthSession();
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const authData = await loginUser(email, password);
    setToken(authData.accessToken);
    setUser({
      id: authData.userId,
      fullName: authData.fullName,
      email: authData.email,
      roles: authData.roles,
    });
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = !!user?.roles?.includes('Admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
