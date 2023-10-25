export enum Permissao {
  EscolaCadastrar = "EscolaCadastrar",
  EscolaEditar = "EscolaEditar",
  EscolaRemover = "EscolaRemover",
  EscolaVisualizar = "EscolaVisualizar",
  
  PerfilCadastrar = "PerfilCadastrar",
  PerfilEditar = "PerfilEditar",
  PerfilRemover = "PerfilRemover",
  PerfilVisualizar = "PerfilVisualizar",
  
  UpsCalcularSinistro = "UpsCalcularSinistro",
  UpsCalcularEscola = "UpsCalcularEscola",
  UpsVisualizar = "UpsVisualizar",

  RodoviaCadastrar = "RodoviaCadastrar",

  SinistroCadastrar = "SinistroCadastrar",

  EmpresaCadastrar = "EmpresaCadastrar",
}

export enum TipoPerfil {
  Basico = "Basico",
  Administrador = "Administrador",
  Customizavel = "Customizavel",
}

export interface LoginResponse {
  token: string;
  tokenAtualizacao: string;
  expiraEm: string;
  permissoes: Permissao[];
}

export interface AtualizarTokenDto {
  token: string;
  tokenAtualizacao: string;
}

export interface PermissaoCategoria{
  categoria: string;
  permissoes: PermissaoModel[];
}

export interface PermissaoModel {
  codigo: Permissao;
  descricao: string;
}

export interface PerfisTabela {
  id: string;
  nome: string;
  quantidadeUsuarios: number;
  tipo: TipoPerfil;
  permissoes: PermissaoModel[];
  categoriasPermissao?: PermissaoCategoria[];
}

export interface TabelaGerenciarPerfil {
  "Tipo de perfil": string;
  "Número de Usuários": number;
  "Permissões": PermissaoModel[];
}
