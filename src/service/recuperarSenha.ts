import axios, { AxiosResponse } from "axios";
import { recuperarSenhaURL } from "../consts/service";
import { RecuperarSenhaData } from "../models/service";

interface RecoverPasswordResponse {
  status: number;
}

async function fetchRecoverPassword(
  recoverData: RecuperarSenhaData
): Promise<RecoverPasswordResponse> {
  try {
    const response: AxiosResponse<RecoverPasswordResponse> = await axios.put(
      recuperarSenhaURL,
      recoverData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchRecoverPassword;
