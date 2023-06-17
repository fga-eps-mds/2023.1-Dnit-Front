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

export interface InfoEscolaData {
  idEscola: number;
  // codigoEscola: number,
  // nomeEscola: string,
  // idRede: number,
  // cep: string,
  // idUf: number,
  // endereco: string,
  // idMunicipio: number,
  // idLocalizacao: number,
  // longitude: string,
  // latitude: string,
  // idEtapasDeEnsino: number,
  // numeroTotalDeAlunos: number,
  // idSituacao: number,
  // idPorte: number,
  // telefone: string,
  // numeroTotalDeDocentes: number
}
