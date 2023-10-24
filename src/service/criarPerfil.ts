import axios, { AxiosResponse } from "axios";
import { cadastrarPerfilUrl } from "../consts/service";
import { PerfilDto } from "../models/perfil";
import { PerfisTabela } from "../models/auth";

async function fetchCadastroPerfil(
  perfil: PerfilDto
): Promise<PerfisTabela> {
  try {
    const response: AxiosResponse<PerfisTabela> = await axios.post(
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
