import axios, { AxiosResponse } from "axios";
import { obterPerfil } from "../consts/service";
import { PerfilModel } from "../models/perfil";

export default async function fetchObterPerfil(id: string): Promise<PerfilModel> {
  try {
    const response: AxiosResponse<PerfilModel> = await axios.get(`${obterPerfil}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
