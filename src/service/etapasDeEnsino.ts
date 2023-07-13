import axios, { AxiosResponse } from "axios";
import { etapasDeEnsinoURL } from "../consts/service";
import { EtapasDeEnsinoData } from "../models/service";

async function fetchEtapasDeEnsino(): Promise<EtapasDeEnsinoData[]> {
  try {
    const response: AxiosResponse<EtapasDeEnsinoData[]> = await axios.get(
      etapasDeEnsinoURL
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchEtapasDeEnsino;
