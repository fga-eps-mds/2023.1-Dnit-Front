export interface FederativeUnit {
  id: number;
  nome: string;
}

export interface Municipio{
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
  NomeEscola: string,
  IdRede: number,
  CodigoEscola: number,
  IdUf: number,
  Cep: string,
  Telefone: string,
  IdEtapasDeEnsino: number,
  IdPorte: number,
  Endereco: string,
  //IdMunicipio: number,
  IdLocalizacao: number,
  Longitude: string,
  Latitude: string,
  NumeroTotalDeAlunos: number,
  NumeroTotalDeDocentes: number

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

export interface SalvarSituacaoData{
  idSituacao: number,
  idEscola: number
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
    descricaoLocalizacao:string;
    longitude: string;
    latitude: string;
    idEtapasDeEnsino: number;
    descricaoEtapasDeEnsino: string;
    numeroTotalDeAlunos: number;
    idSituacao: number;
    descricaoSituacao: string;
    idPorte: number;
    descricaoPorte: string;
    telefone: string;
    numeroTotalDeDocentes: number;
}
export interface ExcluirSituacaoData{
  idEscola: number
}
