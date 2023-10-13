import axios, {AxiosResponse} from "axios";
import {CadastroUsuarioData, CadastroEscolaData, LoginData} from "../models/service";
import * as URL from "../consts/service"

interface CadastroResponse{ status: number }


async function fetchAutenticacao<T>(url: string, data: T): Promise<CadastroResponse> {
    try{
        const response: AxiosResponse<CadastroResponse> = await axios.post(
            url, data
        );
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function fetchCadastroUsuarioData(data:CadastroUsuarioData):Promise<CadastroResponse>{
    return fetchAutenticacao<CadastroUsuarioData>(URL.cadastroUsuarioURL,data);
}

export async function fetchCadastroEscolaData(data:CadastroEscolaData):Promise<CadastroResponse>{
    return fetchAutenticacao<CadastroEscolaData>(URL.cadastroEscolaURL,data);
}

export async function fetchFormData(data:FormData):Promise<CadastroResponse>{
    return fetchAutenticacao<FormData>(URL.cadastroRodoviasURL,data);
}

export async function fetchLoginData(data:LoginData):Promise<CadastroResponse>{
    return fetchAutenticacao<LoginData>(URL.loginURL,data);
}

