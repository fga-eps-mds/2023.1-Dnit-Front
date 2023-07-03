import axios, { AxiosResponse } from "axios";
import { alterarTelefoneURL } from "../consts/service";
import { AlterarTelefoneData } from "../models/service";

interface AlterarTelefoneResponse {
  status: number;
}

async function fetchAlterarTelefone(
  alterarTelefone: AlterarTelefoneData

): Promise<AlterarTelefoneResponse> {
  try {
    const response: AxiosResponse<AlterarTelefoneResponse> = await axios.put(
      alterarTelefoneURL,
      null,
      {
        params: {
          idEscola: alterarTelefone.idEscola,
          telefone: alterarTelefone.telefone
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAlterarTelefone;
