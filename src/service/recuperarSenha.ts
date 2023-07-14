import axios, { AxiosResponse } from "axios";
import { recuperarSenhaURL } from "../consts/service";
import { RecuperarSenhaData } from "../models/service";

interface RecuperarSenhaResponse {
  status: number;
}

async function fetchRecuperarSenha(
  recoverData: RecuperarSenhaData
): Promise<RecuperarSenhaResponse> {
  try {
    const response: AxiosResponse<RecuperarSenhaResponse> = await axios.put(
      recuperarSenhaURL,
      recoverData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchRecuperarSenha;
