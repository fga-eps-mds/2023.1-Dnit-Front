import * as URL from "../consts/service"
import { fetchDados } from "./apiUtils";
import { EscolaRanqueData, EscolaRanqueFiltro, ListaPaginada } from "../models/ranque";
  

export async function fetchEscolasRanque(filtro: EscolaRanqueFiltro): Promise<ListaPaginada<EscolaRanqueData>>{
    return fetchDados<ListaPaginada<EscolaRanqueData>>(URL.listarEscolasRanque, filtro);
}

export async function fetchProcessamentoRanque() {
    try {
      const response = await fetch('api/ranque/processamento');
      const data = await response.json();
      const emProcesso = data.emProgresso;
      return emProcesso;
    } catch (error) {
      console.error('Erro ao buscar dados de processamento:', error);
      throw error;
    }
  }
  
  export async function fetchProcessamentoDataRanque() {
    try {
      const response = await fetch('api/ranque/processamento');
      const data = await response.json();
      const dataFim = data.dataFim;
      return dataFim;
    } catch (error) {
      console.error('Erro ao buscar dados de processamento:', error);
      throw error;
    }
  }
  
