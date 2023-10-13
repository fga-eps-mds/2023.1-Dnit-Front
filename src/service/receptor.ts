import axios, {AxiosResponse} from "axios";
import * as DATA from "../models/service";
import * as URL from "../consts/service";

async function fetchData<T>(url: string): Promise<T>{
    try{
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}

export async function fetchUnidadeFederativa(): Promise<DATA.UnidadeFederativaData[]>{
    return fetchData<DATA.UnidadeFederativaData[]>(URL.unidadesFederativasURL);
}

export async function fetchEtapasDeEnsino(): Promise<DATA.EtapasDeEnsinoData[]>{
    return fetchData<DATA.EtapasDeEnsinoData[]>(URL.etapasDeEnsinoURL);
}

export async function fetchSituacao(): Promise<DATA.SituacaoData[]> {
    return fetchData<DATA.SituacaoData[]>(URL.situacaoURL);
}
    
export async function fetchCEP(cep: string): Promise<DATA.ViaCEPData>{
    const url = `${URL.urlAPIViaCEP}/${cep}/json`;
    return fetchData<DATA.ViaCEPData>(url);
}

export async function fetchMunicipio(UfId: number): Promise<DATA.MunicipioData[]>{
    const url = `${URL.municipioURL}?idUf=${UfId.toString()}`;
    return fetchData<DATA.MunicipioData[]>(url);
}

export async function fetchEscolasInep(municipio: Number): Promise<DATA.EscolaInepData[]>{
    const url = `${URL.escolasInepURL}?municipio=${municipio}`;
    return fetchData<DATA.EscolaInepData[]>(url);
}