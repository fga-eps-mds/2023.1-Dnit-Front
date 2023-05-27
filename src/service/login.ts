import axios, { AxiosResponse } from "axios";
import { loginURL } from "../consts/service";
import { LoginData } from "../models/service";

interface LoginResponse {
  status: number;
}

async function fetchLogin(loginData: LoginData): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      loginURL,
      loginData
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    // Lida com erros de solicitação
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export default fetchLogin;
