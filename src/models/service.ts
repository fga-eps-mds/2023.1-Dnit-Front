import { type } from "os";

export interface UnidadeFederativaData {
  id: number;
  nome: string;
  sigla: string;
}

export interface ViaCEPData {
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

export interface MunicipioData {
  id: number;
  nome: string;
}

export interface EnumData {
  id: number;
  descricao: string;
}

export type SituacaoData = EnumData;
export type EtapasDeEnsinoData = EnumData;
export type LocalizacaoData = EnumData;
export type RedeData = EnumData;

export interface LoginData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}

export interface CadastroUsuarioData {
  email: string;
  senha: string;
  nome: string;
  ufLotacao: number;
}

export interface CadastroEscolaData {
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

export interface RecuperarSenhaData {
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

export interface RedefinirSenhaData {
  uuidAutenticacao: string;
  senha: string;
}

export interface InserirArquivoData {
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
  distanciaSuperintendencia: number;
  superintendenciaId: number;
}

export interface FiltroEscolaData {
  params: {
    Pagina: number;
    TamanhoPagina: number;
    Nome: string;
    IdSituacao: string | number;
    IdMunicipio: string | number;
    IdUf: string | number;
  };
}

export interface EscolasFiltradasResponse {
  escolas: EscolaData[];
  escolasPorPagina: number;
  totalEscolas: number;
  totalPaginas: number;
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
export interface EscolaInepData {
  cod: number;
  estado: string;
  nome: string;
}

export interface SolicitacaoDeAcaoData {
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

export interface CalcularUpsResponse {
  status: number;
  ups2018: number;
  ups2019: number;
  ups2020: number;
  ups2021: number;
  ups2022: number;
  upsGeral: number;
}

export interface UfModel {
  if: number;
  sigla: string;
  nome: string;
}

export interface Superintendencia{
  id: number;
  endereco: string;
  cep: string;
  latitude: string;
  longitude: string;
  uf: number;
  siglaUf: string;
}

export interface Fatores {
  nome: string;
  peso: number;
  valor: number;
}

export interface RanqueInfo {
  ranqueId: number;
  pontuacao: number;
  posicao: number;
  fatores: Fatores[];
}

export interface Escola {
  idEscola: string;
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
  etapasEnsino: EtapasDeEnsinoData[];
  numeroTotalDeAlunos: number;
  idSituacao: number;
  descricaoSituacao: string;
  idPorte: number;
  descricaoPorte: string;
  telefone: string;
  numeroTotalDeDocentes: number;
  observacao: string;
  uf: number;
  descricaoUf: string;
  descricaoEtapasEnsino: string;
  rede: number;
  porte: number;
  localizacao: number;
  situacao: string;
  distanciaSuperintendencia: number;
  superintendenciaId: number;
}