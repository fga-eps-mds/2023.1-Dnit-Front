import axios, { AxiosResponse } from "axios";
import { listarPerfis } from "../consts/service";
import { UsuarioModel } from "../models/usuario";

async function fetchUsuarios<T>(pagina: number, itemsPorPagina: number, nome: string, ufLotacao: number, perfilId: string ): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get("http://localhost:7083/api/usuario",{
        params: {
            pagina,
            itemsPorPagina,
            // nome,
            // ufLotacao,
            // perfilId
        }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchUsuarios;
