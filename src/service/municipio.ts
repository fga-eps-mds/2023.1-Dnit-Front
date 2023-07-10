import axios, { AxiosResponse } from "axios";
import { MunicipioURL } from "../consts/service";
import { Municipio } from "../models/service";

async function fetchMunicipio(UfId: number): Promise<Municipio[]> {
  try {
    const response: AxiosResponse<Municipio[]> = await axios.get(
      `${MunicipioURL}?idUf=${UfId.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchMunicipio;
