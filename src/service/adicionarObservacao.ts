import axios, { AxiosResponse } from "axios";
import { adicionarObservacaoURL } from "../consts/service";
import { AdicionarObservacaoData } from "../models/service";

interface AdicionarObservacaoResponse {
  status: number;
}

async function fetchAdicionarObservacao(
  adicionarObServacaoData: AdicionarObservacaoData
): Promise<AdicionarObservacaoResponse> {
  try {
    const response: AxiosResponse<AdicionarObservacaoResponse> = await axios.put(
      adicionarObservacaoURL,
      adicionarObServacaoData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAdicionarObservacao;
