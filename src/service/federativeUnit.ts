import axios, { AxiosResponse } from "axios";
import { unidadesFederativasURL } from "../consts/service";
import { FederativeUnit } from "../models/service";

async function fetchFederativeUnit(): Promise<FederativeUnit[]> {
  try {
    const response: AxiosResponse<FederativeUnit[]> = await axios.get(
      unidadesFederativasURL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchFederativeUnit;
