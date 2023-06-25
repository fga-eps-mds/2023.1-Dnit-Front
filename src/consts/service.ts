const urlAPI = "https://localhost:7083/api";
//https://api.aprovaunb.com/api
const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;
const loginURL = `${urlAPI}/usuario/login`;
const cadastroURL = `${urlAPI}/usuario/cadastrar`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
//const registerSchoolURL = `${urlAPI}/usuario/cadastrarEscola`;
const registerSchoolURL = `https://localhost:7083/api/escolas/cadastrarEscola`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const listarInfoEscolaURL = `${urlAPI}/escolas/listarInformacoesEscola`;
const salvarSituacaoURL = `${urlAPI}/escolas/adicionarSituacao`;
const resetPasswordURL = `${urlAPI}/usuario/redefinirSenha`;
const listSchoolsURL = `https://localhost:7083/api/escolas/listarEscolas`;
const excluirEscolaURL = `${urlAPI}/escolas/excluir`;
const excluirSituacaoURL = `${urlAPI}/escolas/removerSituacao`
const SituacaoURL = `${urlAPI}/dominio/situacao`;
const EtapasDeEnsinoURL = `${urlAPI}/dominio/etapasDeEnsino`;
const MunicipioURL = `${urlAPI}/dominio/municipio`;
const EscolasFiltradasURL = `${urlAPI}/escolas/obter`;

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
    listSchoolsURL,
    SituacaoURL,
    EtapasDeEnsinoURL,
    MunicipioURL,
    EscolasFiltradasURL,
    registerSchoolURL
};
