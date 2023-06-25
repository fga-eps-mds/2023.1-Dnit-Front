import axios, { AxiosResponse } from "axios";
import { registerURL } from "../consts/service";
import { RegisterData } from "../models/service";

interface RegisterResponse {
  status: number;
}

async function fetchRegister(
  registerData: RegisterData
): Promise<RegisterResponse> {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      registerURL,
      registerData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchRegister;
