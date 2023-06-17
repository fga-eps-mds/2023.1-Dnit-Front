import axios, { AxiosResponse } from "axios";
import { listarInfoEscolaURL } from "../consts/service";
import { InfoEscolaData } from "../models/service";


interface ListarInfoEscolaResponse {
    status: number;
}

async function fetchInfoEscola(ListarInfoEscolaResponse: InfoEscolaData): Promise<ListarInfoEscolaResponse> {
    try {
        const response: AxiosResponse<ListarInfoEscolaResponse> = await axios.get(
            listarInfoEscolaURL
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        // Lida com erros de solicitação
        console.error("Erro ao listar informacoes da escola:", error);
        throw error;
    }
}

export default fetchInfoEscola;
