import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "./auth";

export interface PerfilDto {
    nome: string;
    permissoes: Permissao[];
}

export interface PerfilModel {
    id: string;
    nome: string;
    quantidadeUsuarios: number;
    tipo: TipoPerfil;
    permissoes: PermissaoModel[];
    categoriasPermissao?: PermissaoCategoria[];
  }
  