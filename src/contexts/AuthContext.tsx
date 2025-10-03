import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('facilita_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - replace with real API call
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('facilita_user', JSON.stringify(mockUser));
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('facilita_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('facilita_user', JSON.stringify(user));
    setState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
