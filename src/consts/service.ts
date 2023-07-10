const urlAPIUsuario = "https://api.aprovaunb.com/api";
const urlAPIEscolas = "https://api.dnit-eps-mds.com/api";
const urlAPIUps = "https://api.aprovaunb.com.br/api";
const urlAPIViaCEP = "https://viacep.com.br/ws";
const EtapasDeEnsinoURL = `${urlAPIEscolas}/dominio/etapasDeEnsino`;
const MunicipioURL = `${urlAPIEscolas}/dominio/municipio`;
const federativeUnitURL = `${urlAPIEscolas}/dominio/unidadeFederativa`;
const SituacaoURL = `${urlAPIEscolas}/dominio/situacao`;
const loginURL = `${urlAPIUsuario}/usuario/login`;
const cadastroURL = `${urlAPIUsuario}/usuario/cadastrar`;
const registerURL = `${urlAPIUsuario}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPIUsuario}/usuario/recuperarSenha`;
const resetPasswordURL = `${urlAPIUsuario}/usuario/redefinirSenha`;
const excluirSituacaoURL = `${urlAPIEscolas}/escolas/removerSituacao`;
const registerSchoolURL = `${urlAPIEscolas}/escolas/cadastrarEscola`;
const listarInfoEscolaURL = `${urlAPIEscolas}/escolas/listarInformacoesEscola`;
const listSchoolsURL = `${urlAPIEscolas}/escolas/listarEscolas`;
const excluirEscolaURL = `${urlAPIEscolas}/escolas/excluir`;
const EscolasFiltradasURL = `${urlAPIEscolas}/escolas/obter`;
const insertFileURL = `${urlAPIEscolas}/escolas/cadastrarEscolaPlanilha`;
const alterarDadosEscolaURL = `${urlAPIEscolas}/escolas/alterarDadosEscola`;
const EscolasInepURL = `${urlAPIEscolas}/solicitacaoAcao/escolas`;
const SolicitacaoDeAcaoURL = `${urlAPIEscolas}/solicitacaoAcao`;
const insertFileRodoviasURL = `${urlAPIUps}/rodovia/cadastrarRodoviaPlanilha`;
const calcularUpsURL = `${urlAPIUps}/calcular/ups/escola`;
const SinistroUrl = `${urlAPIUps}/sinistro/cadastrarSinistroPlanilha`;

export {
  EscolasFiltradasURL,
  EscolasInepURL,
  EtapasDeEnsinoURL,
  MunicipioURL,
  SinistroUrl,
  SituacaoURL,
  SolicitacaoDeAcaoURL,
  alterarDadosEscolaURL,
  cadastroURL,
  calcularUpsURL,
  excluirEscolaURL,
  excluirSituacaoURL,
  federativeUnitURL,
  insertFileRodoviasURL,
  insertFileURL,
  listSchoolsURL,
  listarInfoEscolaURL,
  loginURL,
  recoverPasswordURL,
  registerSchoolURL,
  registerURL,
  resetPasswordURL,
  urlAPIViaCEP,
};
