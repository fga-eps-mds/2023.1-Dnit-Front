import axios, { AxiosResponse } from 'axios';
import { cadastroEscolaPlanilhaURL } from "../consts/service";
import { cadastroRodoviasURL } from "../consts/service";



export default


async function fetchCadastro<T>(
  fileData: FormData
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post(
      cadastroEscolaPlanilhaURL,
      fileData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
