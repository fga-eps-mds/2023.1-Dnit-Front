const urlAPI = "https://localhost:7083/api";
//https://api.aprovaunb.com/api
const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;

const loginURL = `${urlAPI}/usuario/login`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const excluirEscolaURL = `${urlAPI}/escolas/excluir`;
const listarInfoEscolaURL= `${urlAPI}/escolas/listarInformacoesEscola`;
const salvarSituacaoURL= `${urlAPI}/escolas/adicionarSituacao`;
const cadastroURL = `${urlAPI}/usuario/cadastrar`;

export { federativeUnitURL, loginURL, registerURL, recoverPasswordURL, excluirEscolaURL, listarInfoEscolaURL, salvarSituacaoURL, cadastroURL };







