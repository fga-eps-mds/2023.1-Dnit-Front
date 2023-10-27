import axios, { AxiosResponse } from "axios";
import { listarUsuarios } from "../consts/service";
import { UsuarioModel } from "../models/usuario";
import { PerfilModel } from "../models/perfil";

interface ListarUsuariosQueryParams {
  pagina: number;
  itemsPorPagina: number;
  nome?: string;
  ufLotacao?: number; 
  perfilId?: string;
}

async function fetchUsuarios<T>(params: ListarUsuariosQueryParams): Promise<T> {
  console.log({params});
  if(params.nome === '') params.nome = undefined
  if(params.perfilId === '') params.perfilId = undefined
  if(params.ufLotacao != undefined && params.ufLotacao <= 0) params.ufLotacao = undefined
  try {
    // const params: ListarUsuariosQueryParams = {pagina, itemsPorPagina};
    // if(nome !== '') params.nome = nome;
    // if(ufLotacao !== undefined && ufLotacao > 0) params.ufLotacao = ufLotacao;
    // if(perfilId !== '') params.perfilId = perfilId;

    const response: AxiosResponse<T> = await axios.get(listarUsuarios,{
        params
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchUsuarios;
