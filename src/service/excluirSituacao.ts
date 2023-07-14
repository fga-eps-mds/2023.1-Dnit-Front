import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface ExcluirSituacaoResponse {
  status: number;
}

async function fetchExcluirSituacao(
  excluirSituacaoData: ExcluirSituacaoData
): Promise<ExcluirSituacaoResponse> {
  try {
    const response: AxiosResponse<ExcluirSituacaoResponse> = await axios.post(
      excluirSituacaoURL,
      null,
      { params: { idEscola: excluirSituacaoData.idEscola } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchExcluirSituacao;
