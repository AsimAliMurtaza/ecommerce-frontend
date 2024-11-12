import React, { createContext, useContext, useState, useEffect } from "react";
import { signin } from "../api/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; name: string } | void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (storedToken && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ token: string; name: string } | void> => {
    try {
      const res = await signin(email, password);

      if (res && res.token && res.name) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.name);

        setIsAuthenticated(true);
        setUserName(res.userName);

        return { token: res.token, name: res.name };
      } else {
        throw new Error("Authentication failed. Invalid response format.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
