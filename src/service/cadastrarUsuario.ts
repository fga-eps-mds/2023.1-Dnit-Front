import axios, { AxiosError, AxiosResponse } from "axios";
import { cadastroUsuarioURL } from "../consts/service";
import { CadastroUsuarioData } from "../models/service";
import { ExcessoesApi } from "./excessoes";

interface CadastroUsuarioResponse {
  status: number;
}

async function fetchCadastroUsuario(
  registerData: CadastroUsuarioData
): Promise<CadastroUsuarioResponse> {
  try {
    const response: AxiosResponse<CadastroUsuarioResponse> = await axios.post(
      cadastroUsuarioURL,
      registerData
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      var erro = error.response?.data as ExcessoesApi;
      throw new ExcessoesApi(
        erro.codeStr,
        erro.message,
        erro.details)

      

    }
    console.log({ error });
    throw error;
  }
}

export default fetchCadastroUsuario;
