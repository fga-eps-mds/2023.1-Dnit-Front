const urlAPIUsuario = "https://api.aprovaunb.com/api";
const urlAPIEscolas = "https://api.dnit-eps-mds.com/api";
const urlAPIUps = "https://api.aprovaunb.com.br/api";
const urlAPIViaCEP = "https://viacep.com.br/ws";
const federativeUnitURL = `${urlAPIEscolas}/dominio/unidadeFederativa`;
const loginURL = `${urlAPIUsuario}/usuario/login`;
const cadastroURL = `${urlAPIUsuario}/usuario/cadastrar`;
const registerURL = `${urlAPIUsuario}/usuario/cadastrarUsuarioDnit`;
const registerSchoolURL = `${urlAPIEscolas}/escolas/cadastrarEscola`;
const recoverPasswordURL = `${urlAPIUsuario}/usuario/recuperarSenha`;
const listarInfoEscolaURL = `${urlAPIEscolas}/escolas/listarInformacoesEscola`;
const salvarSituacaoURL = `${urlAPIEscolas}/escolas/adicionarSituacao`;
const resetPasswordURL = `${urlAPIUsuario}/usuario/redefinirSenha`;
const listSchoolsURL = `${urlAPIEscolas}/escolas/listarEscolas`;
const excluirEscolaURL = `${urlAPIEscolas}/escolas/excluir`;
const excluirSituacaoURL = `${urlAPIEscolas}/escolas/removerSituacao`;
const SituacaoURL = `${urlAPIEscolas}/dominio/situacao`;
const EtapasDeEnsinoURL = `${urlAPIEscolas}/dominio/etapasDeEnsino`;
const MunicipioURL = `${urlAPIEscolas}/dominio/municipio`;
const EscolasFiltradasURL = `${urlAPIEscolas}/escolas/obter`;
const insertFileURL = `${urlAPIEscolas}/escolas/cadastrarEscolaPlanilha`;
const calcularUpsURL = `${urlAPIUps}/calcular/ups/escola`;
const EscolasInepURL = `${urlAPIEscolas}/solicitacaoAcao/escolas`;
const SolicitacaoDeAcaoURL = `${urlAPIEscolas}/solicitacaoAcao`;

export {
  EscolasFiltradasURL,
  EscolasInepURL,
  EtapasDeEnsinoURL,
  MunicipioURL,
  SituacaoURL,
  SolicitacaoDeAcaoURL,
  cadastroURL,
  calcularUpsURL,
  excluirEscolaURL,
  excluirSituacaoURL,
  federativeUnitURL,
  insertFileURL,
  listSchoolsURL,
  listarInfoEscolaURL,
  loginURL,
  recoverPasswordURL,
  registerSchoolURL,
  registerURL,
  resetPasswordURL,
  salvarSituacaoURL,
  urlAPIViaCEP,
};
