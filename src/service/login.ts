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
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchLogin;
