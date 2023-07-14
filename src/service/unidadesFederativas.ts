import axios, { AxiosResponse } from "axios";
import { unidadesFederativasURL } from "../consts/service";
import { UnidadeFederativaData } from "../models/service";

async function fetchUnidadeFederativa(): Promise<UnidadeFederativaData[]> {
  try {
    const response: AxiosResponse<UnidadeFederativaData[]> = await axios.get(
      unidadesFederativasURL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchUnidadeFederativa;
