import axios, { AxiosResponse } from "axios";
import { PerfisTabela } from "../models/auth";
import { obterPerfil } from "../consts/service";

export default async function fetchObterPerfil(id: string): Promise<PerfisTabela> {
  try {
    const response: AxiosResponse<PerfisTabela> = await axios.get(`${obterPerfil}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
