import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL  } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface SituationResponse {
    status: number;
}

async function fetchdeleteSituation(excluirSituacaoData: ExcluirSituacaoData): Promise<SituationResponse> {
    try {
        const response: AxiosResponse<SituationResponse> = await axios.post(
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
