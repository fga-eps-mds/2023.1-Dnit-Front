import axios, { AxiosResponse } from "axios";
import { excluirEscolaURL } from "../consts/service";
import { ExcluirEscolaData } from "../models/service";

interface excluirEscolaResponse {
  status: number;
}

async function fetchExcluirEscola(
  { id_escola }: ExcluirEscolaData
): Promise<excluirEscolaResponse> {
  try {
    const response: AxiosResponse<excluirEscolaResponse> = await axios.delete(
      excluirEscolaURL, { params: { id: id_escola } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchExcluirEscola;
