import axios, { AxiosResponse } from "axios";
import { recoverPasswordURL } from "../consts/service";
import { RecoverPasswordData } from "../models/service";

interface RecoverPasswordResponse {
  status: number;
}

async function fetchRecuperarSenha(
  recoverData: RecoverPasswordData
): Promise<RecoverPasswordResponse> {
  try {
    const response: AxiosResponse<RecoverPasswordResponse> = await axios.put(
        recoverPasswordURL,
        recoverData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchRecuperarSenha;
