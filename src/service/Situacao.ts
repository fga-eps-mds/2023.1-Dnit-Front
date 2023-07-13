import axios, { AxiosResponse } from "axios";
import { situacaoURL } from "../consts/service";
import { Situacao } from "../models/service";

async function fetchSituacao(): Promise<Situacao[]> {
  try {
    const response: AxiosResponse<Situacao[]> = await axios.get(situacaoURL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchSituacao;
