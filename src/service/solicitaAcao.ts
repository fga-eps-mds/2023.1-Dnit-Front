import axios, { AxiosResponse } from "axios";
import { SolicitacaoDeAcaoURL } from "../consts/service";
import { SolicitacaoDeAcao } from "../models/service";

interface Response {
    status: number;
}

async function fetchSolicitaAcao(formData: SolicitacaoDeAcao): Promise<Response> {
    try {
        console.log(formData)
        const response: AxiosResponse<Response> = await axios.post(
            SolicitacaoDeAcaoURL,
            {...formData} as SolicitacaoDeAcao
            // {
            //     "Escola": "AAAAAAAA",
            //     "UF": "DF",
            //     "Municipio": "brasolia",
            //     "NomeSolicitante": "JOAO",
            //     "VinculoEscola": "Profesor",
            //     "Email": "jongamatos2014@gmail.com",
            //     "Telefone": "6666666666666",
            //     "CiclosEnsino": [
            //         "infantil",
            //         "adulto"
            //     ],
            //     "QuantidadeAlunos": 99999999,
            //     "Observacoes": "amo queijo"
            // }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default fetchSolicitaAcao;