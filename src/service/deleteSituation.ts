import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface deleteSituationResponse {
  status: number;
}

async function fetchDeleteSituation(
  excluirSituacaoData: ExcluirSituacaoData
): Promise<deleteSituationResponse> {
  try {
    const response: AxiosResponse<deleteSituationResponse> = await axios.post(
      excluirSituacaoURL,
      null,
      { params: { idEscola: excluirSituacaoData.idEscola } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchDeleteSituation;
