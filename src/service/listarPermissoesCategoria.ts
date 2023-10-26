import axios, { AxiosResponse } from "axios";
import { PermissaoCategoria } from "../models/auth";
import { listarPermissoesCategoria } from "../consts/service";

async function fetchPermissoesCategoria(): Promise<PermissaoCategoria[]> {
  try {
    const response: AxiosResponse<PermissaoCategoria[]> = await axios.get(listarPermissoesCategoria);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchPermissoesCategoria;
