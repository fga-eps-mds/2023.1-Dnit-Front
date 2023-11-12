import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "./auth";
import { PerfilModel } from "./perfil";

export interface UsuarioDto {
    nome: string;
    permissoes: Permissao[];
}

export interface UsuarioModel {
    id: string;
    email: string;
    nome: string;
    cnpj: string;
    perfilId: string;
    perfil: PerfilModel;
    ufLotacao: number;
    municipio: number;
}

export interface ListarUsuariosQueryParams {
    pagina: number;
    itemsPorPagina: number;
    total?: number;
    nome?: string;
    ufLotacao?: string;
    perfilId?: string;
    municipio?: string
  }
  