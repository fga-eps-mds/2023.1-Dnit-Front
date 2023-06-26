import axios, { AxiosResponse } from "axios";
import { RegisterSchoolData } from "../models/service";
import { registerSchoolURL } from "../consts/service";

interface RegisterSchoolResponse {
  status: number;
}

async function fetchCadastroEscola(
  registerSchoolData: RegisterSchoolData): Promise<RegisterSchoolResponse> {
  try {
    const response: AxiosResponse<RegisterSchoolResponse> = await axios.post(
      registerSchoolURL,
      registerSchoolData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchCadastroEscola;
