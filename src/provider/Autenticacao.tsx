import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { AtualizarTokenDto, LoginResponse } from "../models/auth";
import axios, { AxiosResponse } from "axios";
import { atualizarTokenUrl } from "../consts/service";

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
  axios.defaults.headers.common.Authorization = token;
}

function salvarLogin(dados: LoginResponse) {
  localStorage.setItem(AuthLocalStorage.Token, dados.token);
  localStorage.setItem(AuthLocalStorage.TokenAtualizacao, dados.tokenAtualizacao);
  localStorage.setItem(AuthLocalStorage.ExpiraEm, dados.expiraEm);
  localStorage.setItem(AuthLocalStorage.Permissoes, dados.permissoes?.join(','));
  setApiToken(dados.token);
}

function removerLogin() {
  Object.values(AuthLocalStorage).forEach(a => localStorage.removeItem(a));
  setApiToken(null);
}

async function atualizarToken() {
  const dados: AtualizarTokenDto = {
    token: localStorage.getItem(AuthLocalStorage.Token) ?? "",
    tokenAtualizacao: localStorage.getItem(AuthLocalStorage.TokenAtualizacao) ?? "",
  }
  const autenticacao: AxiosResponse<LoginResponse> = await axios.post(atualizarTokenUrl, dados);
  salvarLogin(autenticacao.data);
  return autenticacao.data.token;
}

export function configuraAutenticacaoAxios() {
  axios.interceptors.response.use((response) => response, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await atualizarToken();
        originalRequest.headers.Authorization = token;
        return axios(originalRequest);
      } catch {
        removerLogin();
        useNavigate()('/');
      }
    }
    return Promise.reject(error);
  });
}

export const AuthContext = createContext<AuthContextType>({
  login: () => { },
  logout: () => { },
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
    removerLogin();
  };

  return (
    <AuthContext.Provider value={{ login, logout, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
