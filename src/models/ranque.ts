import { EtapasDeEnsinoData, MunicipioData } from "./service";

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
    uf: string;
    etapasEnsino: EtapasDeEnsinoData[];
    municipio: MunicipioData; 
}

export interface EscolaRanqueData {
    ranqueId: string;
    pontuacao: number;
    posicao: number;
    escola: EscolaRanqueInfo;
}
