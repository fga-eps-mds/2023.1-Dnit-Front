import axios, { AxiosResponse } from "axios";
import { situacaoURL } from "../consts/service";
import { SituacaoData } from "../models/service";

async function fetchSituacao(): Promise<SituacaoData[]> {
  try {
    const response: AxiosResponse<SituacaoData[]> = await axios.get(situacaoURL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchSituacao;
