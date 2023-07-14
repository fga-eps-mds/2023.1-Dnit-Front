import axios, { AxiosResponse } from "axios";
import { cadastroEscolaURL } from "../consts/service";
import { CadastroEscolaData } from "../models/service";

interface CadastroEscolaResponse {
  status: number;
}

async function fetchCadastroEscola(
  registerSchoolData: CadastroEscolaData
): Promise<CadastroEscolaResponse> {
  try {
    const response: AxiosResponse<CadastroEscolaResponse> = await axios.post(
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
