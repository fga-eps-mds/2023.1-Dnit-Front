import axios, { AxiosResponse } from "axios";
import { AlterarDadosEscolaData, RecuperarSenhaData, RedefinirSenhaData } from "../models/service";
import * as URL from "../consts/service";

interface ModificadorResponse{ status: number }

async function fetchModificador<T>(data: T, url: string): Promise<ModificadorResponse>{
    try {
        const response: AxiosResponse<ModificadorResponse> = await axios.put(url, data);
        return response.data
    } catch (error){
        console.log(error);
        throw error;
    }
}

export async function fetchRedefinirSenha(data: RedefinirSenhaData): Promise<ModificadorResponse>{
    return fetchModificador<RedefinirSenhaData>(data, URL.redefinirSenhaURL); 
}

export async function fetchRecuperarSenha(data: RecuperarSenhaData): Promise<ModificadorResponse>{
    return fetchModificador<RecuperarSenhaData>(data, URL.recuperarSenhaURL);
}

export async function fetchAlterarDadosEscola(data: AlterarDadosEscolaData): Promise<ModificadorResponse>{
    return fetchModificador<AlterarDadosEscolaData>(data, URL.alterarDadosEscolaURL);
}