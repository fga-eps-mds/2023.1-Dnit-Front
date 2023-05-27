import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  login: () => void;
  logout: () => void;
  getAuth: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  getAuth: () => false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const getAuth = () => {
    let storage = localStorage.getItem("login");
    return !!storage;
  };

  const login = () => {
    localStorage.setItem("login", "autenticado");
    getAuth();
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("login");
    getAuth();
  };

  return (
    <AuthContext.Provider value={{ login, logout, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
