export interface FederativeUnit {
  id: number;
  nome: string;
}

export interface Municipio {
  id: number;
  nome: string;
}

export interface Situacao {
  id: number;
  descricao: string;
}

export interface EtapasDeEnsino {
  id: number;
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
  NomeEscola: string;
  IdRede: number;
  CodigoEscola: number;
  IdUf: number;
  Cep: string;
  Telefone: string;
  IdEtapasDeEnsino: number;
  IdPorte: number;
  Endereco: string;
  //IdMunicipio: number,
  IdLocalizacao: number;
  Longitude: string;
  Latitude: string;
  NumeroTotalDeAlunos: number;
  NumeroTotalDeDocentes: number;
}

export interface RecoverPasswordData {
  nome: string;
  email: string;
  senha: string;
}
export interface ExcluirEscolaData {
  id_escola: number;
}

export interface InfoEscolaData {
  id: number;
}

export interface SalvarSituacaoData {
  idSituacao: number;
  idEscola: number;
}

export interface RecoverPasswordData {
  nome: string;
  email: string;
  senha: string;
}

export interface ResetPasswordData {
  uuidAutenticacao: string;
  senha: string;
}

export interface InsertFileData {
  arquivo: File;
}
export interface EscolaData {
  idEscola: number;
  codigoEscola: number;
  nomeEscola: string;
  idRede: number;
  descricaoRede: string;
  cep: string;
  idUf: number;
  siglaUf: string;
  endereco: string;
  idMunicipio: number;
  nomeMunicipio: string;
  idLocalizacao: number;
  descricaoLocalizacao: string;
  longitude: string;
  latitude: string;
  idEtapasDeEnsino: number;
  descricaoEtapasEnsino: string;
  numeroTotalDeAlunos: number;
  idSituacao: number;
  descricaoSituacao: string;
  idPorte: number;
  descricaoPorte: string;
  telefone: string;
  numeroTotalDeDocentes: number;
  observacao: string;
}
export interface ExcluirSituacaoData {
  idEscola: number;
}

export interface AdicionarObservacaoData {
  idEscola: number;
  observacao: string;
}

export interface AlterarTelefoneData {
  idEscola: number;
  telefone: string;
}

export interface AlterarLongitudeData {
  idEscola: number;
  longitude: string;
}

export interface AlterarLatitudeData {
  idEscola: number;
  latitude: string;
}

export interface AlterarNumDeAlunosData {
  idEscola: number;
  numeroTotalDeAlunos: number;
}

export interface AlterarNumDeDocentesData {
  idEscola: number;
  numeroTotalDeDocentes: number;
}