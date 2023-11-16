import axios, { AxiosError, AxiosResponse } from "axios";
import * as URL from "../consts/service";
import * as DATA from "../models/service";
import { ExcessoesApi } from "./excessoes";

export interface ResponseStatus { status: number }

export async function sendCadastros<T>(url: string, data: T): Promise<ResponseStatus> {
    try{
        const response: AxiosResponse<ResponseStatus> = await axios.post(
            url, data
        );
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function sendCadastrosDnit<T>(url: string, data: T): Promise<ResponseStatus> {
    try{
        const response: AxiosResponse<ResponseStatus> = await axios.post(
            url, data
        );
        return response.data;
    }
    catch(error){
        if (error instanceof AxiosError) {
            let erro = error.response?.data as ExcessoesApi;
            throw new ExcessoesApi(
              erro.codeStr,
              erro.message,
              erro.details);
          }
          console.log({ error });
          throw error;
    }
}

export async function update<T>(url: string, data: T): Promise<ResponseStatus>{
    try {
        const response: AxiosResponse<ResponseStatus> = await axios.put(
            url, data
        );
        return response.data
    } catch (error){
        console.log(error);
        throw error;
    }
}

export async function fetchDados<T>(url: string, params: any = null): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCEP(cep: string): Promise<DATA.ViaCEPData>{
    const url = `${URL.urlAPIViaCEP}/${cep}/json`;
    return fetchDados<DATA.ViaCEPData>(url);
}