import axios, { AxiosResponse } from "axios";
import { salvarSituacaoURL } from "../consts/service";
import { SalvarSituacaoData } from "../models/service";

interface SituationResponse {
  status: number;
}

async function fetchchangeSituation(
  salvarSituacaoData: SalvarSituacaoData
): Promise<SituationResponse> {
  try {
    const response: AxiosResponse<SituationResponse> = await axios.post(
      salvarSituacaoURL,
      salvarSituacaoData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchchangeSituation;
