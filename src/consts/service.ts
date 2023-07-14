const urlAPIUsuario = "https://api.aprovaunb.com/api";
const urlAPIEscolas = "https://api.dnit-eps-mds.com/api";
const urlAPIUps = "https://api.aprovaunb.com.br/api";
const urlAPIViaCEP = "https://viacep.com.br/ws";
const etapasDeEnsinoURL = `${urlAPIEscolas}/dominio/etapasDeEnsino`;
const municipioURL = `${urlAPIEscolas}/dominio/municipio`;
const unidadesFederativasURL = `${urlAPIEscolas}/dominio/unidadeFederativa`;
const situacaoURL = `${urlAPIEscolas}/dominio/situacao`;
const loginURL = `${urlAPIUsuario}/usuario/login`;
const cadastroURL = `${urlAPIUsuario}/usuario/cadastrar`;
const cadastroUsuarioURL = `${urlAPIUsuario}/usuario/cadastrarUsuarioDnit`;
const recuperarSenhaURL = `${urlAPIUsuario}/usuario/recuperarSenha`;
const redefinirSenhaURL = `${urlAPIUsuario}/usuario/redefinirSenha`;
const excluirSituacaoURL = `${urlAPIEscolas}/escolas/removerSituacao`;
const cadastroEscolaURL = `${urlAPIEscolas}/escolas/cadastrarEscola`;
const listarInfoEscolaURL = `${urlAPIEscolas}/escolas/listarInformacoesEscola`;
const listarEscolasURL = `${urlAPIEscolas}/escolas/listarEscolas`;
const excluirEscolaURL = `${urlAPIEscolas}/escolas/excluir`;
const escolasFiltradasURL = `${urlAPIEscolas}/escolas/obter`;
const cadastroEscolaPlanilhaURL = `${urlAPIEscolas}/escolas/cadastrarEscolaPlanilha`;
const alterarDadosEscolaURL = `${urlAPIEscolas}/escolas/alterarDadosEscola`;
const escolasInepURL = `${urlAPIEscolas}/solicitacaoAcao/escolas`;
const solicitacaoDeAcaoURL = `${urlAPIEscolas}/solicitacaoAcao`;
const cadastroRodoviasURL = `${urlAPIUps}/rodovia/cadastrarRodoviaPlanilha`;
const calcularUpsURL = `${urlAPIUps}/calcular/ups/escola`;
const cadastroSinistrosURL = `${urlAPIUps}/sinistro/cadastrarSinistroPlanilha`;

export {
  escolasFiltradasURL,
  escolasInepURL,
  etapasDeEnsinoURL,
  municipioURL,
  cadastroSinistrosURL,
  situacaoURL,
  solicitacaoDeAcaoURL,
  alterarDadosEscolaURL,
  cadastroURL,
  calcularUpsURL,
  excluirEscolaURL,
  excluirSituacaoURL,
  unidadesFederativasURL,
  cadastroRodoviasURL,
  cadastroEscolaPlanilhaURL,
  listarEscolasURL,
  listarInfoEscolaURL,
  loginURL,
  recuperarSenhaURL,
  cadastroEscolaURL,
  cadastroUsuarioURL,
  redefinirSenhaURL,
  urlAPIViaCEP,
};
