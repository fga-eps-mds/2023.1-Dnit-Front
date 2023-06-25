export interface FederativeUnit {
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

export interface RegisterData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}

export interface RegisterSchoolData {
  NomeEscola: string,
  IdRede: number,
  CodigoEscola: number,
  IdUf: number,
  Cep: string,
  Telefone: string,
  IdEtapasDeEnsino: number,
  IdPorte: number,
  Endereco: string,
  IdMunicipio: number,
  IdLocalizacao: number,
  Longitude: string,
  Latitude: string,
  NumeroTotalAlunos: number,
  NumeroTotalDocentes: number
}