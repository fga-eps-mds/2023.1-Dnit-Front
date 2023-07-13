import axios, { AxiosResponse } from "axios";
import { etapasDeEnsinoURL } from "../consts/service";
import { EtapasDeEnsino } from "../models/service";

async function fetchEtapasDeEnsino(): Promise<EtapasDeEnsino[]> {
  try {
    const response: AxiosResponse<EtapasDeEnsino[]> = await axios.get(
      etapasDeEnsinoURL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchEtapasDeEnsino;
