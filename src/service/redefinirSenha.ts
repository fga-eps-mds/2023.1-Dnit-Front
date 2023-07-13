import axios, { AxiosResponse } from "axios";
import { redefinirSenhaURL } from "../consts/service";
import { RedefinirSenhaData } from "../models/service";

interface ResetPasswordResponse {
  status: number;
}

async function fetchResetPassword(
  resetPassword: RedefinirSenhaData
): Promise<ResetPasswordResponse> {
  try {
    const response: AxiosResponse<ResetPasswordResponse> = await axios.put(
      redefinirSenhaURL,
      resetPassword
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchResetPassword;
