import axios, { AxiosResponse } from "axios";
import { solicitacaoDeAcaoURL } from "../consts/service";
import { SolicitacaoDeAcao } from "../models/service";

interface Response {
  status: number;
}

async function fetchSolicitaAcao(
  formData: SolicitacaoDeAcao
): Promise<Response> {
  try {
    if (formData.Observacoes === undefined)
      formData.Observacoes = "*Nenhuma observação foi informada.*";
    const response: AxiosResponse<Response> = await axios.post(
      solicitacaoDeAcaoURL,
      { ...formData } as SolicitacaoDeAcao
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchSolicitaAcao;
