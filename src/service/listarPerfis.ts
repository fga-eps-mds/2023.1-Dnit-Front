import axios, { AxiosResponse } from "axios";
import { PerfisTabela } from "../models/auth";
import { listarPerfis } from "../consts/service";

async function fetchPerfis(pagina: number, tamanhoPagina: number, nome: string): Promise<PerfisTabela[]> {
  try {
    const response: AxiosResponse<PerfisTabela[]> = await axios.get(listarPerfis,{
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
