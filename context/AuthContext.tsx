"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
