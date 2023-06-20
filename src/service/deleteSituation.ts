import axios, { AxiosResponse } from "axios";
import { excluirSituacaoURL  } from "../consts/service";
import { ExcluirSituacaoData } from "../models/service";

interface deleteSituationResponse {
    status: number;
}

async function fetchDeleteSituation(excluirSituacaoData: ExcluirSituacaoData): Promise<deleteSituationResponse> {
    console.log({excluirSituacaoData})
    try {
        const response: AxiosResponse<deleteSituationResponse> = await axios.post(
            excluirSituacaoURL , null,
            {params:{idEscola: excluirSituacaoData.idEscola}}
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        // Lida com erros de solicitação
        console.error("Erro ao excluir situacao:", error);
        throw error;
    }
}

export default fetchDeleteSituation;