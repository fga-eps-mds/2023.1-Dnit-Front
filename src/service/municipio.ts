import axios, { AxiosResponse } from "axios";
import { municipioURL } from "../consts/service";
import { MunicipioData } from "../models/service";

async function fetchMunicipio(UfId: number): Promise<MunicipioData[]> {
  try {
    const response: AxiosResponse<MunicipioData[]> = await axios.get(
      `${municipioURL}?idUf=${UfId.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchMunicipio;
