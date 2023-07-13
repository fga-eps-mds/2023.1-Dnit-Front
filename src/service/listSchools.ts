import axios, { AxiosResponse } from "axios";
import { listarEscolasURL } from "../consts/service";
import { EscolaData } from "../models/service";

async function fetchlistSchools(): Promise<EscolaData[]> {
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

export default fetchlistSchools;
