import axios, { AxiosResponse } from "axios";
import { listarInfoEscolaURL } from "../consts/service";
import { InfoEscolaData } from "../models/service";

interface ListarInfoEscolaResponse {
  status: number;
}

async function fetchInfoEscola({
  id,
}: InfoEscolaData): Promise<ListarInfoEscolaResponse> {
  try {
    const response: AxiosResponse<ListarInfoEscolaResponse> = await axios.get(
      listarInfoEscolaURL,
      { params: { idEscola: id } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchInfoEscola;
