import axios, { AxiosResponse } from "axios";
import { MunicipioURL } from "../consts/service";
import { Municipio } from "../models/service";


async function fetchMunicipio(): Promise<Municipio[]> {
  try {
    const response: AxiosResponse<Municipio[]> = await axios.get(
      MunicipioURL
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchMunicipio;