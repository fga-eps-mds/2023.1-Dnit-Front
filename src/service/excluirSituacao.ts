import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface DeleteSituationResponse {
  status: number;
}

async function fetchDeleteSituation(
  excluirSituacaoData: ExcluirSituacaoData
): Promise<DeleteSituationResponse> {
  try {
    const response: AxiosResponse<DeleteSituationResponse> = await axios.post(
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

export default fetchDeleteSituation;
