import axios, { AxiosResponse } from "axios";
import { cadastroURL } from "../consts/service";
import { CadastroData } from "../models/service";

interface CadastroResponse {
  status: number;
}

async function fetchCadastro(
  cadastroData: CadastroData
): Promise<CadastroResponse> {
  try {
    const response: AxiosResponse<CadastroResponse> = await axios.post(
      cadastroURL,
      cadastroData
    );
    return response.data;
  } catch (error) {
    // Lida com erros de solicitação
    console.error("Erro ao fazer cadastro:", error);
    throw error;
  }
}

export default fetchCadastro;
