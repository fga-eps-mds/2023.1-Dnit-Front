import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "../../models/auth";
import { PerfilModel } from "../../models/perfil";
import { UsuarioModel } from "../../models/usuario";


const permissao: PermissaoModel = {
  codigo: Permissao.EmpresaCadastrar,
  descricao: "descreve"
}

const categoria: PermissaoCategoria = {
  categoria: "categoria a",
  permissoes: [permissao]
}

const perfil: PerfilModel = {
  id: "0",
  nome: "perfil0",
  permissoes: [permissao],
  quantidadeUsuarios: 5,
  tipo: TipoPerfil.Basico,
  categoriasPermissao: [categoria]

};

export const usuarios: UsuarioModel[] = [
  {
    id: "0",
    cnpj: "cnpj0",
    email: "Teste@email.com",
    nome: "usuario0",
    ufLotacao: 1,
    perfilId: "id0",
    perfil: perfil
  },
  {
    id: "1",
    cnpj: "cnpj1",
    email: "Teste1@email.com",
    nome: "usuario1",
    ufLotacao: 7,
    perfilId: "id1",
    perfil: perfil
  }
]