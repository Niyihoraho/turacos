"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (identity: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved session on mount
    const savedAdmin = localStorage.getItem('turacos_admin_session');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (identity: string, password: string): boolean => {
    // Simple admin check: phone/email and password
    // NOTE: In a real app, this would be a server-side verification
    const validIdentities = ['+250793622438'];
    const validPassword = 'Turacos@079';

    if (validIdentities.includes(identity) && password === validPassword) {
      setIsAdmin(true);
      localStorage.setItem('turacos_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('turacos_admin_session');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
