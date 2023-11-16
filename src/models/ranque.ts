import { EtapasDeEnsinoData, MunicipioData, UfModel } from "./service";

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
    uf: UfModel;
    etapaEnsino: EtapasDeEnsinoData[];
    municipio: MunicipioData;
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
    uf?: number;
    municipio?: number;
}
