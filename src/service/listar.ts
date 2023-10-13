import axios, { AxiosResponse } from "axios";
import { listarInfoEscolaURL, listarEscolasURL } from "../consts/service";
import { InfoEscolaData, EscolaData } from "../models/service";

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

