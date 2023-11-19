import { EtapasDeEnsinoData, MunicipioData, RedeData, SituacaoData, Superintendencia, UnidadeFederativaData } from "./service";

export interface ListaPaginada<T> {
    pagina: number
    itemsPorPagina: number;
    total: number;
    totalPaginas: number;
    items: T[];
}

export interface EscolaRanqueInfo {
    id: string;
    nome: string;
    uf: UnidadeFederativaData;
    etapaEnsino: EtapasDeEnsinoData[];
    municipio: MunicipioData;
    distanciaSuperintendencia: number;
    superintendencia: SuperintendenciaModel;
}

export interface EscolaRanqueData {
    ranqueId: string;
    pontuacao: number;
    posicao: number;
    escola: EscolaRanqueInfo;
}

export interface EscolaRanqueFiltro {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
    idUf: number;
    idMunicipio?: number;
    idEtapaEnsino?: number[];
}

export interface RanqueProcessamentoData {
    id: number;
    emProgresso: boolean;
    dataInicio: string;
    dataFim: string;
}

interface ranqueInfo {
    ranqueId: number;
    pontuacao: number;
    posicao: number;
    fatores: {
        nome: string;
        peso: number;
        valor: number;
    }[];
}

export interface EscolaRanqueDetalhes {
    ranqueInfo: ranqueInfo;
    id: string;
    codigo: string;
    nome: string;
    cep: string;
    endereco: string;
    longitude: string;
    latitude: string;
    totalAlunos: string;
    telefone: string;
    totalDocentes: string;
    uf?: UnidadeFederativaData;
    municipio?: MunicipioData;
    rede?: RedeData;
    porte?: SituacaoData;
    localizacao?: SituacaoData;
    situacao?: SituacaoData;
    etapasEnsino?: EtapasDeEnsinoData[];
    superintendencia?: SuperintendenciaModel;
    distanciaSuperintendencia: number;
}

export interface SuperintendenciaModel {
    id: number;
    uf: string;
}