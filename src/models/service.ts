export interface FederativeUnit {
  id: number;
  nome: string;
  sigla: string;
}

export interface ViaCEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
  sigla: string;
  descricao: string;
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
  etapaEnsino: {};
  numeroTotalDeAlunos: number;
  idSituacao: number;
  descricaoSituacao: string;
  idPorte: number;
  descricaoPorte: string;
  telefone: string;
  numeroTotalDeDocentes: number;
  observacao: string;
}

export interface AlterarDadosEscolaData {
  idEscola: number;
  idSituacao: number;
  telefone: string;
  longitude: string;
  latitude: string;
  numeroTotalDeAlunos: number;
  numeroTotalDeDocentes: number;
  observacao: string;
  idEtapasDeEnsino: [];
  ultimaAtualizacao: string;
}

export interface ExcluirSituacaoData {
  idEscola: number;
}
export interface InepSchoolData {
  cod: number;
  estado: string;
  nome: string;
}

export interface SolicitacaoDeAcao {
  Escola: string;
  UF: string;
  Municipio: string;
  NomeSolicitante: string;
  VinculoEscola: string;
  Email: string;
  Telefone: string;
  CiclosEnsino: string[];
  QuantidadeAlunos: number;
  Observacoes: string | undefined;
}

export interface CalcularUpsData {
  latitude: number;
  longitude: number;
}
