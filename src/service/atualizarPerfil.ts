import axios, { AxiosResponse } from "axios";
import { atualizarPerfil } from "../consts/service";
import { PerfilDto, PerfilModel } from "../models/perfil";

export default async function fetchAtualizarPerfil(id: string, perfil: PerfilDto): Promise<PerfilModel> {
  try {
    const response: AxiosResponse<PerfilModel> = await axios.put(`${atualizarPerfil}/${id}`, perfil);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
