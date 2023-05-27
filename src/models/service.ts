export interface UnidadeFederativa {
  id: number;
  sigla: string;
  descricao: string;
}

export interface LoginData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}

export interface CadastroData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}
