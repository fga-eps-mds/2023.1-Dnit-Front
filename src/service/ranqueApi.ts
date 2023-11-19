import * as URL from "../consts/service"
import { fetchDados } from "./apiUtils";
import { EscolaRanqueData, EscolaRanqueDetalhes, EscolaRanqueFiltro, ListaPaginada, RanqueProcessamentoData } from "../models/ranque";


export async function fetchEscolasRanque(filtro: EscolaRanqueFiltro): Promise<ListaPaginada<EscolaRanqueData>> {
  return fetchDados<ListaPaginada<EscolaRanqueData>>(URL.listarEscolasRanque, filtro);
}

export async function fetchProcessamentoRanque(): Promise<RanqueProcessamentoData> {
  return fetchDados<RanqueProcessamentoData>(URL.ranqueamentoProcessamento);
}

export async function fetchEscolaRanque(id: string) {
  return fetchDados<EscolaRanqueDetalhes>(`${URL.listarEscolasRanque}/${id}`);
}