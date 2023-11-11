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
  id: "1",
  nome: "perfil1",
  permissoes: [permissao],
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
    perfilId: "id1",
    perfil: perfil,
    municipio: {nome: "Angra dos Reis", id: 3300100}
  },
  {
    id: "2",
    cnpj: "cnpj2",
    email: "Teste1@email.com",
    nome: "usuario2",
    ufLotacao: 27,
    perfilId: "id1",
    perfil: perfil,
    municipio: {nome: "Brasília", id: 5300108}
  }
]