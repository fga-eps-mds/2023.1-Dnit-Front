import axios, { AxiosResponse } from "axios";
import { atualizarTipoPerfil } from "../consts/service";

export default async function fetchAtualizarTipoPerfil(usuarioId: string, perfilId: string, ufLotacao: number): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.patch(
      `${atualizarTipoPerfil}/${usuarioId}/perfil`, {novoPerfilId: perfilId, novaUF: ufLotacao});
      // `${atualizarTipoPerfil}/${usuarioId}/perfil`, perfilId);
    //return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


