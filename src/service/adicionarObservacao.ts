import axios, { AxiosResponse } from "axios";
import { adicionarObservacaoURL } from "../consts/service";
import { AdicionarObservacaoData } from "../models/service";

interface AdicionarObservacaoResponse {
  status: number;
}

async function fetchAdicionarObservacao(
  adicionarObservacao: AdicionarObservacaoData

): Promise<AdicionarObservacaoResponse> {
  try {
    const response: AxiosResponse<AdicionarObservacaoResponse> = await axios.put(
      adicionarObservacaoURL,
      null,
      {
        params: {
          idEscola: adicionarObservacao.idEscola,
          observacao: adicionarObservacao.observacao
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAdicionarObservacao;
