import axios, { AxiosResponse } from "axios";
import { cadastroRodoviasURL } from "../consts/service";

interface CadastroRodoviasResponse {
  status: number;
}

async function fetchCadastroRodovias(
  fileData: FormData
): Promise<CadastroRodoviasResponse> {
  try {
    const response: AxiosResponse<CadastroRodoviasResponse> = await axios.post(
      cadastroRodoviasURL,
      fileData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCadastroRodovias;
