import axios, { AxiosResponse } from "axios";
import { excluirEscolaURL } from "../consts/service";
import { ExcluirEscolaData } from "../models/service";

interface ExcluirEscolaResponse {
  status: number;
}

async function fetchExcluirEscola({
  id_escola,
}: ExcluirEscolaData): Promise<ExcluirEscolaResponse> {
  try {
    const response: AxiosResponse<ExcluirEscolaResponse> = await axios.delete(
      excluirEscolaURL,
      { params: { id: id_escola } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchExcluirEscola;
