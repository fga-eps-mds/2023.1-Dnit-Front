import axios, { AxiosResponse } from "axios";
import { Permissao } from "../models/auth";
import { listarUsuarioPermissoes } from "../consts/service";

async function fetchPermissoesDoUsuario(): Promise<Permissao[]> {
  try {
    const response: AxiosResponse<Permissao[]> = await axios.get(listarUsuarioPermissoes);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchPermissoesDoUsuario;
