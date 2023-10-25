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

  UsuarioGerenciar = "UsuarioGerenciar",

  RodoviaCadastrar = "RodoviaCadastrar",

  SinistroCadastrar = "SinistroCadastrar",
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
