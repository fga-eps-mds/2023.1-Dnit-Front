import axios, { AxiosResponse } from "axios";
import { SituacaoURL } from "../consts/service";
import { Situacao } from "../models/service";


async function fetchSituacao(): Promise<Situacao[]> {
  try {
    const response: AxiosResponse<Situacao[]> = await axios.get(
      SituacaoURL
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchSituacao;