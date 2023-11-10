import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "./auth";
import { PerfilModel } from "./perfil";
import { MunicipioData } from "./service";

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
    municipio: MunicipioData;
  }
  