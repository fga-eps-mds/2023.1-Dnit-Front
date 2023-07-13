import axios, { AxiosResponse } from "axios";
import { alterarDadosEscolaURL } from "../consts/service";
import { AlterarDadosEscolaData } from "../models/service";

interface AlterarDadosEscolaResponse {
  status: number;
}

async function fetchAlterarDadosEscola(
  alterarDadosEscolaData: AlterarDadosEscolaData
): Promise<AlterarDadosEscolaResponse> {
  try {
    const response: AxiosResponse<AlterarDadosEscolaResponse> = await axios.put(
      alterarDadosEscolaURL,
      alterarDadosEscolaData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchAlterarDadosEscola;
