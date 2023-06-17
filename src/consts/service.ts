const urlAPI = "https://api.aprovaunb.com/api";

const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;
const loginURL = `${urlAPI}/usuario/login`;
const cadastroURL = `${urlAPI}/usuario/cadastrar`;
const listarInfoEscolaURL= `${urlAPI}/escolas/listarInformacoesEscola`;
const salvarSituacaoURL= `${urlAPI}/escolas/adicionarSituacao`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const resetPasswordURL = `${urlAPI}/usuario/redefinirSenha`;

export { loginURL, cadastroURL, listarInfoEscolaURL, salvarSituacaoURL,federativeUnitURL, recoverPasswordURL, registerURL, resetPasswordURL };



