const urlAPI = "https://api.aprovaunb.com/api";

const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;

const loginURL = `${urlAPI}/usuario/login`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
const recoverPasswordURL = `${urlAPI}/usuario/recuperarSenha`;
const resetPasswordURL = `${urlAPI}/usuario/redefinirSenha`;
const insertFile = `${urlAPI}/escolas/cadastrarEscolaPlanilha`;

export {
  federativeUnitURL,
  loginURL,
  recoverPasswordURL,
  registerURL,
  resetPasswordURL,
};
