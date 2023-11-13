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
  id: "1",
  nome: "perfil1",
  permissoes: permissao,
  quantidadeUsuarios: 5,
  tipo: TipoPerfil.Basico,
  categoriasPermissao: [categoria]
};

export const usuarios: UsuarioModel[] = [
  {
    id: "1",
    cnpj: "cnpj1",
    email: "Teste@email.com",
    nome: "usuario1",
    ufLotacao: 18,
    perfilId: "a2627d97-f748-4d84-a80e-7b78ac540a7f",
    perfil: perfil,
    municipio: {nome: "Angra dos Reis", id: 3300100}
  },
  {
    id: "2",
    cnpj: "cnpj2",
    email: "Teste1@email.com",
    nome: "usuario2",
    ufLotacao: 27,
    perfilId: "a2627d97-f748-4d84-a80e-7b78ac540a7f",
    perfil: perfil,
    municipio: {nome: "Brasília", id: 5300108}
  },
  {
    id: "3",
    cnpj: "cnpj3",
    email: "Teste3@email.com",
    nome: "usuario3",
    ufLotacao: 3,
    perfilId: "a2627d97-f748-4d84-a80e-7b78ac540a7f",
    perfil: perfil,
    municipio: {nome: '', id: 0}, 
  }
]