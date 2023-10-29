import axios, { AxiosResponse } from "axios";
import { listarUsuarios } from "../consts/service";
import { UsuarioModel } from "../models/usuario";
import { PerfilModel } from "../models/perfil";

interface ListarUsuariosQueryParams {
  pagina: number;
  itemsPorPagina: number;
  nome?: string;
  ufLotacao?: string;
  perfilId?: string;
  municipio?: string
}

async function fetchUsuarios<T>(params: ListarUsuariosQueryParams): Promise<T> {
  console.log({ params });
  if (params.nome === '') params.nome = undefined
  if (params.perfilId === '') params.perfilId = undefined
  if (params.ufLotacao  === '') params.ufLotacao = undefined
  if (params.municipio  === '') params.municipio = undefined
  try {
    const response: AxiosResponse<T> = await axios.get(listarUsuarios, {
      params
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchUsuarios;
