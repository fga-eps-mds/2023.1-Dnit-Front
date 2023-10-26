import axios, { AxiosResponse } from "axios";
import { excluiPerfil } from "../consts/service";

interface ExcluirPerfilResponse {
  status: number;
}

async function fetchExcluirPerfil(
  id: string): Promise<ExcluirPerfilResponse> {
  try {
    const response: AxiosResponse<ExcluirPerfilResponse> = await axios.delete(
        excluiPerfil + "/" + id
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchExcluirPerfil;
