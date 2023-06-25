const urlAPI = "https://api.aprovaunb.com/api";

const federativeUnitURL = `${urlAPI}/dominio/unidadeFederativa`;

const loginURL = `${urlAPI}/usuario/login`;
const registerURL = `${urlAPI}/usuario/cadastrarUsuarioDnit`;
//const registerSchoolURL = `${urlAPI}/usuario/cadastrarEscola`;
const registerSchoolURL = `https://localhost:7083/api/escolas/cadastrarEscola`;

export { federativeUnitURL, loginURL, registerURL, registerSchoolURL };
