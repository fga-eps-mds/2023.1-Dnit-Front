import axios, { AxiosResponse } from "axios";
import { alterarNumDocentesURL } from "../consts/service";
import { AlterarNumDeDocentesData } from "../models/service";

interface AlterarNumDeDocentesResponse {
  status: number;
}

async function fetchAlterarNumDeDocentes(
  alterarNumDeDocentes: AlterarNumDeDocentesData

): Promise<AlterarNumDeDocentesResponse> {
  try {
    const response: AxiosResponse<AlterarNumDeDocentesResponse> = await axios.put(
      alterarNumDocentesURL,
      null,
      {
        params: {
          idEscola: alterarNumDeDocentes.idEscola,
          numeroDeDocentes: alterarNumDeDocentes.numeroTotalDeDocentes
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAlterarNumDeDocentes;
