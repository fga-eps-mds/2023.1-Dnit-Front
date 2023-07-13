import axios, { AxiosResponse } from "axios";
import { cadastroEscolaURL } from "../consts/service";
import { RegisterSchoolData } from "../models/service";

interface RegisterSchoolResponse {
  status: number;
}

async function fetchCadastroEscola(
  registerSchoolData: RegisterSchoolData
): Promise<RegisterSchoolResponse> {
  try {
    const response: AxiosResponse<RegisterSchoolResponse> = await axios.post(
      cadastroEscolaURL,
      registerSchoolData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCadastroEscola;
