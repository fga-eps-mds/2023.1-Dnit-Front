import * as URL from "../consts/service"
import { fetchDados } from "./apiUtils";
import { EscolaRanqueData, EscolaRanqueFiltro, ListaPaginada } from "../models/ranque";
  

export async function fetchEscolasRanque(filtro: EscolaRanqueFiltro): Promise<ListaPaginada<EscolaRanqueData>>{
    return fetchDados<ListaPaginada<EscolaRanqueData>>(URL.listarEscolasRanque, filtro);
}
