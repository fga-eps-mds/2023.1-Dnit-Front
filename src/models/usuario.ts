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
    perfil: PerfilModel;
    tipo: TipoPerfil;
    ufLotação: number;
    permissoes: PermissaoModel[];
    categoriasPermissao?: PermissaoCategoria[];
  }
  