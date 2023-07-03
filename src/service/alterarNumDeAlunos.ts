import axios, { AxiosResponse } from "axios";
import { alterarNumAlunosURL } from "../consts/service";
import { AlterarNumDeAlunosData } from "../models/service";

interface AlterarNumDeAlunosResponse {
  status: number;
}

async function fetchAlterarNumDeAlunos(
  alterarNumDeAlunos: AlterarNumDeAlunosData

): Promise<AlterarNumDeAlunosResponse> {
  try {
    const response: AxiosResponse<AlterarNumDeAlunosResponse> = await axios.put(
      alterarNumAlunosURL,
      null,
      {
        params: {
          idEscola: alterarNumDeAlunos.idEscola,
          numeroDeAlunos: alterarNumDeAlunos.numeroTotalDeAlunos
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAlterarNumDeAlunos;
