import axios, { AxiosResponse } from "axios";
import { listarPerfis } from "../consts/service";
import { PerfilModel } from "../models/perfil";

async function fetchPerfis(pagina: number, tamanhoPagina: number, nome: string): Promise<PerfilModel[]> {
  try {
    const response: AxiosResponse<PerfilModel[]> = await axios.get(listarPerfis, {
      params: {
        pageIndex: pagina,
        pageSize: tamanhoPagina,
        nome
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchPerfis;
