const urlAPI = "https://api.aprovaunb.com/api";

const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;

const loginURL = `${urlAPI}/usuario/login`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const resetPasswordURL = `${urlAPI}/usuario/redefinirSenha`;
const listSchoolsURL = `https://localhost:7083/api/escolas/listarEscolas`;

export {
  federativeUnitURL,
  loginURL,
  recoverPasswordURL,
  registerURL,
  resetPasswordURL,
  listSchoolsURL
};
