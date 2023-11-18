import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { EscolaDataRanque } from "../pages/Ranque";
import { ResponseStatus, sendCadastros, update, fetchDados } from "./apiUtils";
import {Superintendencia} from "../models/service";


export async function fetchUnidadeFederativa(): Promise<DATA.UnidadeFederativaData[]> {
    return fetchDados<DATA.UnidadeFederativaData[]>(URL.unidadesFederativasURL);
}

export async function fetchEtapasDeEnsino(): Promise<DATA.EtapasDeEnsinoData[]> {
    return fetchDados<DATA.EtapasDeEnsinoData[]>(URL.etapasDeEnsinoURL);
}

export async function fetchMunicipio(UfId: number): Promise<DATA.MunicipioData[]> {
    const url = `${URL.municipioURL}?idUf=${UfId.toString()}`;
    return fetchDados<DATA.MunicipioData[]>(url);
}

export async function fetchSituacao(): Promise<DATA.SituacaoData[]> {
    return fetchDados<DATA.SituacaoData[]>(URL.situacaoURL);
}

export async function fetchEscolaData(id: any) {
    return fetchDados<EscolaDataRanque>(`${URL.listarEscolasRanque}/${id}`);
}

export async function fetchSuperintendenciaData(id: any) {
    return fetchDados<Superintendencia>(`${URL.listarSuperintendencia}/${id}`);
}

export async function sendCadastroEscolasPlanilha(data: FormData): Promise<any> {
    return sendCadastros<FormData>(URL.cadastroEscolaPlanilhaURL, data);
}

export async function fetchListarEscolasFiltradas(filtroTabelaData: DATA.FiltroEscolaData): Promise<DATA.EscolasFiltradasResponse> {
    try {
        const response: AxiosResponse<DATA.EscolasFiltradasResponse> = await axios.get(
            URL.escolasFiltradasURL,
            filtroTabelaData
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteEscola({ id_escola }: DATA.ExcluirEscolaData): Promise<ResponseStatus> {
    try {
        const response: AxiosResponse<ResponseStatus> = await axios.delete(
            URL.excluirEscolaURL, { params: { id: id_escola } }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function sendCadastroEscolas(data: DATA.CadastroEscolaData): Promise<ResponseStatus> {
    return sendCadastros<DATA.CadastroEscolaData>(URL.cadastroEscolaURL, data);
}

export async function sendExcluirSituacao(excluirSituacaoData: DATA.ExcluirSituacaoData): Promise<ResponseStatus> {
    try {
        const response: AxiosResponse<ResponseStatus> = await axios.post(
            URL.excluirSituacaoURL,
            null,
            { params: { idEscola: excluirSituacaoData.idEscola } }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateAlteraDadosEscola(data: DATA.AlterarDadosEscolaData): Promise<ResponseStatus> {
    return update<DATA.AlterarDadosEscolaData>(URL.alterarDadosEscolaURL, data);
}

export async function sendSolicitaAcao(formData: DATA.SolicitacaoDeAcaoData): Promise<ResponseStatus> {
    try {
        if (formData.Observacoes === undefined)
            formData.Observacoes = "*Nenhuma observação foi informada.*";
        const response: AxiosResponse<Response> = await axios.post(
            URL.solicitacaoDeAcaoURL,
            { ...formData } as DATA.SolicitacaoDeAcaoData
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchEscolasInep(municipio: Number): Promise<DATA.EscolaInepData[]> {
    const url = `${URL.escolasInepURL}?municipio=${municipio}`;
    return fetchDados<DATA.EscolaInepData[]>(url);
}