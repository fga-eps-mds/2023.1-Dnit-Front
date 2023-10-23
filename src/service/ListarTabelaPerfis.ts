import axios, { AxiosResponse } from "axios";
import { PerfisTabela } from "../models/auth";
import { listarTabelaPerfis } from "../consts/service";

interface TabelaProps{
    paginaAtual: number;
    perfisPorPagina: number;
}

async function fetchTabelaPerfis({paginaAtual, perfisPorPagina}: TabelaProps): Promise<PerfisTabela[]> {
  try {
    const response: AxiosResponse<PerfisTabela[]> = await axios.get(listarTabelaPerfis,{
        params: {
            pageIndex: paginaAtual,
            pageSize: perfisPorPagina,
        }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchTabelaPerfis;
