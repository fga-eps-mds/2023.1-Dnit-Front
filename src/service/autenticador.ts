import axios, {AxiosResponse} from "axios";
import {CadastroUsuarioData, CadastroEscolaData, LoginData} from "../models/service";

interface CadastroResponse{ status: number }
type CadastroData = CadastroUsuarioData | CadastroEscolaData | FormData | LoginData;

async function fetchAutenticacao(url: string, data: CadastroData): Promise<CadastroResponse> {
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

export default fetchAutenticacao;