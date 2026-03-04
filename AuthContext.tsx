import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import {
  getCurrentUser,
  setCurrentUser,
  getUserByEmail,
  saveUser,
  initializeStorage,
} from '../services/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStorage();
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const foundUser = getUserByEmail(email);

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (foundUser.role === 'admin' && password !== 'admin123') {
      return { success: false, error: 'Invalid email or password' };
    }

    if (foundUser.role === 'citizen' && password !== 'citizen123') {
      return { success: false, error: 'Invalid email or password' };
    }

    setUser(foundUser);
    setCurrentUser(foundUser);
    return { success: true };
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const existingUser = getUserByEmail(email);

    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone,
      role: 'citizen',
      createdAt: new Date(),
    };

    saveUser(newUser);
    setUser(newUser);
    setCurrentUser(newUser);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
