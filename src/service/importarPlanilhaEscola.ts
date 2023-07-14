import axios, { AxiosResponse } from "axios";
import { cadastroEscolaPlanilhaURL } from "../consts/service";

interface CadastroEscolaPlanilhaResponse {
  status: number;
  data: [];
}

async function fetchCadastroEscolaPlanilha(
  fileData: FormData
): Promise<CadastroEscolaPlanilhaResponse> {
  try {
    const response: AxiosResponse<CadastroEscolaPlanilhaResponse> = await axios.post(
      cadastroEscolaPlanilhaURL,
      fileData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCadastroEscolaPlanilha;
