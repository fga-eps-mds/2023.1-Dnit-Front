import axios, { AxiosResponse } from "axios";
import { EtapasDeEnsinoURL } from "../consts/service";
import { EtapasDeEnsino } from "../models/service";


async function fetchEtapasDeEnsino(): Promise<EtapasDeEnsino[]> {
  try {
    const response: AxiosResponse<EtapasDeEnsino[]> = await axios.get(
      EtapasDeEnsinoURL
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchEtapasDeEnsino;