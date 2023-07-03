import axios, { AxiosResponse } from "axios";
import { adicionarObservacaoURL } from "../consts/service";
import { AdicionarObservacaoData } from "../models/service";

interface AdicionarObservacaoResponse {
  status: number;
}

async function fetchAdicionarObservacao(
  idEscola: number, observacao: string

): Promise<AdicionarObservacaoResponse> {
  try {
    const response: AxiosResponse<AdicionarObservacaoResponse> = await axios.put(
      adicionarObservacaoURL, 
      null,
      {params: {idEscola, observacao}}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAdicionarObservacao;
