import axios, { AxiosResponse } from "axios";
import { cadastrarPerfilUrl } from "../consts/service";
import { PerfilDto, PerfilModel } from "../models/perfil";

async function fetchCadastroPerfil(
  perfil: PerfilDto
): Promise<PerfilModel> {
  try {
    const response: AxiosResponse<PerfilModel> = await axios.post(
      cadastrarPerfilUrl,
      perfil
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCadastroPerfil;
