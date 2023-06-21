const urlAPI = "https://localhost:7083/api";
//https://api.aprovaunb.com/api
const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;
const loginURL = `${urlAPI}/usuario/login`;
const cadastroURL = `${urlAPI}/usuario/cadastrar`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const listarInfoEscolaURL = `${urlAPI}/escolas/listarInformacoesEscola`;
const salvarSituacaoURL = `${urlAPI}/escolas/adicionarSituacao`;
const resetPasswordURL = `${urlAPI}/usuario/redefinirSenha`;
const listSchoolsURL = `https://localhost:7083/api/escolas/listarEscolas`;
const excluirEscolaURL = `${urlAPI}/escolas/excluir`;
const excluirSituacaoURL = `${urlAPI}/escolas/removerSituacao`

export {
    federativeUnitURL,
    loginURL,
    registerURL,
    recoverPasswordURL,
    excluirEscolaURL,
    listarInfoEscolaURL,
    salvarSituacaoURL,
    cadastroURL,
    resetPasswordURL,
    excluirSituacaoURL,
    listSchoolsURL
};
