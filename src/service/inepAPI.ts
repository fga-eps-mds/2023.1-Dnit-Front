import axios, { AxiosResponse } from "axios";
import { escolasInepURL } from "../consts/service";
import { EscolaInepData } from "../models/service";

async function fetchEscolasInep(municipio: number): Promise<EscolaInepData[]> {
  try {
    const response: AxiosResponse<EscolaInepData[]> = await axios.get(
      `${escolasInepURL}?municipio=${municipio}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { fetchEscolasInep };
