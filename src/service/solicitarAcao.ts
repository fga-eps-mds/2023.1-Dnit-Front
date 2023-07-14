import axios, { AxiosResponse } from "axios";
import { solicitacaoDeAcaoURL } from "../consts/service";
import { SolicitacaoDeAcaoData } from "../models/service";

interface Response {
  status: number;
}

async function fetchSolicitaoAcao(
  formData: SolicitacaoDeAcaoData
): Promise<Response> {
  try {
    if (formData.Observacoes === undefined)
      formData.Observacoes = "*Nenhuma observação foi informada.*";
    const response: AxiosResponse<Response> = await axios.post(
      solicitacaoDeAcaoURL,
      { ...formData } as SolicitacaoDeAcaoData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchSolicitaoAcao;
