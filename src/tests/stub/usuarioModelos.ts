import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "../../models/auth";
import { PerfilModel } from "../../models/perfil";
import { UsuarioModel } from "../../models/usuario";


const permissao: PermissaoModel[] = [
  {
    codigo: Permissao.UsuarioVisualizar,
    descricao: "Visualizar Usuário"
  },
  {
    codigo: Permissao.UsuarioEditar,
    descricao: "Editar Perfil Usuário"
  }
]


const categoria: PermissaoCategoria = {
  categoria: "categoria a",
  permissoes: permissao
}

const perfil: PerfilModel = {
  id: "0",
  nome: "Básico",
  permissoes: permissao,
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
    perfilId: "a2627d97-f748-4d84-a80e-7b78ac540a7f",
    perfil: perfil,
    municipio: 10
  },
  {
    id: "1",
    cnpj: "cnpj1",
    email: "Teste1@email.com",
    nome: "usuario1",
    ufLotacao: 27,
    perfilId: "a2627d97-f748-4d84-a80e-7b78ac540a7f",
    perfil: perfil,
    municipio: 1
  }
]