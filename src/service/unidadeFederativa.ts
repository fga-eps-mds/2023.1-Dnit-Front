import axios, { AxiosResponse } from "axios";
import { unidadeFederativaURL } from "../consts/service";
import { UnidadeFederativa } from "../models/service";

async function fetchUnidadeFederativa(): Promise<UnidadeFederativa[]> {
  try {
    const response: AxiosResponse<UnidadeFederativa[]> = await axios.get(
      unidadeFederativaURL
    );
    return response.data;
  } catch (error) {
    // Lida com erros de solicitação
    console.error("Erro ao buscar unidade federativa:", error);
    throw error;
  }
}

export default fetchUnidadeFederativa;
