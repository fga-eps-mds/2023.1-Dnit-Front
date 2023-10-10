import axios, {AxiosResponse} from "axios";
import {excluirEscolaURL, excluirSituacaoURL} from "../consts/service";
import {ExcluirEscolaData, ExcluirSituacaoData} from "../models/service";

interface ExcluirResponse{ status: number }

export async function fetchExcluirEscola({id_escola,}:ExcluirEscolaData):Promise<ExcluirResponse> {
    try{
        const response: AxiosResponse<ExcluirResponse> = await  axios.delete(
            excluirEscolaURL, {params: {id: id_escola}}
        );
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
}

export async function fetchExcluirSituacao(excluirSituacaoData: ExcluirSituacaoData): Promise<ExcluirResponse>{
    try {
        const response: AxiosResponse<ExcluirResponse> = await  axios.post(
            excluirSituacaoURL,
            null,
            {params: {idEscola: excluirSituacaoData.idEscola}}
        );
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}