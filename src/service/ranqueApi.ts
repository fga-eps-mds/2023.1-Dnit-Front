import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { fetchDados } from "./apiUtils";
import { EscolaRanqueData, ListaPaginada } from "../models/ranque";
  

export async function fetchEscolasRanque(): Promise<ListaPaginada<EscolaRanqueData>>{
    return fetchDados<ListaPaginada<EscolaRanqueData>>(URL.listarEscolasRanque);
}
