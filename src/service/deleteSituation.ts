import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL  } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface deleteSituationResponse {
    status: number;
}

async function fetchdeleteSituation(excluirSituacaoData: ExcluirSituacaoData): Promise<deleteSituationResponse> {
    try {
        const response: AxiosResponse<deleteSituationResponse> = await axios.put(
            excluirSituacaoURL ,
            excluirSituacaoData
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        // Lida com erros de solicitação
        console.error("Erro ao excluir situacao:", error);
        throw error;
    }
}

export default fetchdeleteSituation;