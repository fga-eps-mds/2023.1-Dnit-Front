import axios, { AxiosResponse } from "axios";
import { atualizarTipoPerfil } from "../consts/service";
import { PerfilDto, PerfilModel } from "../models/perfil";

export default async function fetchAtualizarTipoPerfil(usuarioId: string, perfilId: string): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.patch(
      `${atualizarTipoPerfil}/${usuarioId}/perfil`, {novoPerfilId: perfilId});
      // `${atualizarTipoPerfil}/${usuarioId}/perfil`, perfilId);
    //return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


