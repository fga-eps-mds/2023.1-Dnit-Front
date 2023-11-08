import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service";
import * as DATA from "../models/service";

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

export async function fetchDados<T>(url: string): Promise<T>{
    try{
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}

export async function fetchCEP(cep: string): Promise<DATA.ViaCEPData>{
    const url = `${URL.urlAPIViaCEP}/${cep}/json`;
    return fetchDados<DATA.ViaCEPData>(url);
}