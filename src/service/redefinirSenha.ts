import axios, { AxiosResponse } from "axios";
import { redefinirSenhaURL } from "../consts/service";
import { RedefinirSenhaData } from "../models/service";

interface RedefinirSenhaResponse {
  status: number;
}

async function fetchRedefinirSenha(
  resetPassword: RedefinirSenhaData
): Promise<RedefinirSenhaResponse> {
  try {
    const response: AxiosResponse<RedefinirSenhaResponse> = await axios.put(
      redefinirSenhaURL,
      resetPassword
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchRedefinirSenha;
