import axios, { AxiosResponse } from "axios";
import { PerfisTabela } from "../models/auth";
import { atualizarPerfil } from "../consts/service";
import { PerfilDto } from "../models/perfil";

export default async function fetchAtualizarPerfil(id: string, perfil: PerfilDto): Promise<PerfisTabela> {
  try {
    const response: AxiosResponse<PerfisTabela> = await axios.put(`${atualizarPerfil}/${id}`, perfil);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
