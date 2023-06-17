import axios, { AxiosResponse } from "axios";
import { salvarSituacaoURL } from "../consts/service";
import { SalvarSituacaoData } from "../models/service";

interface SituationResponse {
    status: number;
}

async function fetchchangeSituation(salvarSituacaoData: SalvarSituacaoData): Promise<SituationResponse> {
    try {
        const response: AxiosResponse<SituationResponse> = await axios.post(
            salvarSituacaoURL,
            salvarSituacaoData
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        // Lida com erros de solicitação
        console.error("Erro ao adicionar situacao:", error);
        throw error;
    }
}

export default fetchchangeSituation;
