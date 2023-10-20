import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../models/auth";
import axios from "axios";

export enum AuthLocalStorage {
  Token = "Token",
  TokenAtualizacao = "TokenAtualizacao",
  ExpiraEm = "ExpiraEm",
  Permissoes = "Permissoes"
}

interface AuthContextType {
  login: (dados: LoginResponse) => void;
  logout: () => void;
  getAuth: () => boolean;
}

function setApiToken(token?: string | null) {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
}

function salvarLogin(dados: LoginResponse) {
  localStorage.setItem(AuthLocalStorage.Token, dados.token);
  localStorage.setItem(AuthLocalStorage.TokenAtualizacao, dados.tokenAtualizacao);
  localStorage.setItem(AuthLocalStorage.ExpiraEm, dados.expiraEm);
  localStorage.setItem(AuthLocalStorage.Permissoes, dados.permissoes?.join(','));
  setApiToken(dados.token);
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
    let token = localStorage.getItem(AuthLocalStorage.Token);
    if (!!token && !axios.defaults.headers.common.Authorization) {
      setApiToken(token);
    }
    return !!token;
  };

  const login = (dados: LoginResponse) => {
    salvarLogin(dados);
    navigate("/home");
  };

  const logout = () => {
    setApiToken(null);
    Object.values(AuthLocalStorage).forEach(a => localStorage.removeItem(a));
  };

  return (
    <AuthContext.Provider value={{ login, logout, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
