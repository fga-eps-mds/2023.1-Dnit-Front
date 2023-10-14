import axios, { AxiosResponse } from "axios";
import { listarInfoEscolaURL, listarEscolasURL, escolasFiltradasURL } from "../consts/service";
import { InfoEscolaData, EscolaData, FiltroEscolaData } from "../models/service";

interface ListarInfoEscolaResponse {
  status: number;
}

export async function fetchInfoEscola({
  id,
}: InfoEscolaData): Promise<ListarInfoEscolaResponse> {
  try {
    const response: AxiosResponse<ListarInfoEscolaResponse> = await axios.get(
      listarInfoEscolaURL,
      { params: { idEscola: id } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchListarEscolas(): Promise<EscolaData[]> {
  try {
    const response: AxiosResponse<EscolaData[]> = await axios.get(
      listarEscolasURL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface EscolasFiltradasResponse {
  escolas: EscolaData[];
  escolasPorPagina: number;
  totalEscolas: number;
  totalPaginas: number;
}

export async function fetchListarEscolasFiltradas(filtroTabelaData: FiltroEscolaData): Promise<EscolasFiltradasResponse> {
  try {
    const response: AxiosResponse<EscolasFiltradasResponse> = await axios.get(
      escolasFiltradasURL,
      filtroTabelaData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}