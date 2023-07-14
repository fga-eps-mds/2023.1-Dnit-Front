import axios, { AxiosResponse } from "axios";
import { cadastroUsuarioURL } from "../consts/service";
import { CadastroUsuarioData } from "../models/service";

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
    console.log(error);
    throw error;
  }
}

export default fetchCadastroUsuario;
