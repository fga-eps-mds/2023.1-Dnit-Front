import axios, { AxiosResponse } from "axios";
import { loginURL } from "../consts/service";
import { LoginData } from "../models/service";
import { LoginResponse } from "../models/auth";
import { AuthLocalStorage } from "../provider/Autenticacao";

async function fetchLogin(loginData: LoginData): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      loginURL,
      loginData
    );
    localStorage.setItem(AuthLocalStorage.Email, loginData.email);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchLogin;
