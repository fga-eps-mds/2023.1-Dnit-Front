import axios, {AxiosResponse} from "axios";
import { CadastroUsuarioData, CadastroEscolaData } from "../models/service";
interface CadastroResponse{ status: number }
type CadastroData = CadastroUsuarioData | CadastroEscolaData;

async function fetchCadastro(url: string, data: CadastroData): Promise<CadastroResponse>{
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
export default fetchCadastro;