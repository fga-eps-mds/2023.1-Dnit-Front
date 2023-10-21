export enum Permissao {
  EscolaCadastrar = "EscolaCadastrar",
  EscolaEditar = "EscolaEditar",
  EscolaRemover = "EscolaRemover",
  EscolaVisualizar = "EscolaVisualizar",
  EmpresaCadastrar = "EmpresaCadastrar",
  EmpresaEditar = "EmpresaEditar",
  EmpresaRemover = "EmpresaRemover",
  PerfilCadastrar = "PerfilCadastrar",
  PerfilEditar = "PerfilEditar",
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
