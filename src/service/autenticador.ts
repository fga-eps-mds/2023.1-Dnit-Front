import axios, {AxiosResponse} from "axios";
import {CadastroUsuarioData, CadastroEscolaData, LoginData} from "../models/service";
import {LoginResponse} from "../models/auth";
import * as URL from "../consts/service"
import { AuthLocalStorage } from "../provider/Autenticacao";

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

export async function fetchCadastroUsuario(data:CadastroUsuarioData):Promise<CadastroResponse>{
    return fetchAutenticacao<CadastroUsuarioData>(URL.cadastroUsuarioURL,data);
}

export async function fetchCadastroEscola(data:CadastroEscolaData):Promise<CadastroResponse>{
    return fetchAutenticacao<CadastroEscolaData>(URL.cadastroEscolaURL,data);
}

export async function fetchForm(data:FormData):Promise<CadastroResponse>{
    return fetchAutenticacao<FormData>(URL.cadastroRodoviasURL,data);
}

export async function fetchLogin(data:LoginData):Promise<LoginResponse>{
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
          URL.loginURL,
          data
        );
        localStorage.setItem(AuthLocalStorage.Email, data.email);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
}

