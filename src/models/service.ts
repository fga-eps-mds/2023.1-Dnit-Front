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

export interface SituacaoData {
  id: number;
  descricao: string;
}

export interface EtapasDeEnsinoData {
  id: number;
  descricao: string;
}

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
  uf: number;
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
