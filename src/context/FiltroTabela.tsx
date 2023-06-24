import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import { EscolaData, FederativeUnit, Situacao, EtapasDeEnsino, Municipio} from '../models/service';
import axios, { AxiosResponse } from 'axios';
import { EscolasFiltradasURL } from '../consts/service';
import { useFetcher } from 'react-router-dom';

interface FiltroContextType {
    nomeEscola: string;
    setNomeEscola: Dispatch<SetStateAction<string>>;

    UFSelecionada: FederativeUnit | false;
    setUFSelecionada: Dispatch<SetStateAction<FederativeUnit | false>>

    situacaoSelecionada: Situacao | false;
    setSituacaoSelecionada: Dispatch<SetStateAction<Situacao | false>>;

    etapaDeEnsinoSelecionada: EtapasDeEnsino | false;
    setEtapaDeEnsinoSelecionada: Dispatch<SetStateAction<EtapasDeEnsino | false>>;

    municipioSelecionado: Municipio | false;
    setMunicipioSelecionado: Dispatch<SetStateAction<Municipio | false>>;

    escolasFiltradas: EscolaData[] | false;
    totalEscolas: number;
    totalPaginas: number;
    paginaAtual: number;
    mudarPagina: (incremento: number) => void;
    mudarQuantidadePorPaginas: (novaQuantia: number) => void;
    escolasPorPagina: number;

}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

const FiltroProvider = ({ children }: any) => {

    const [nomeEscola, setNomeEscola] = useState("");
    const [UFSelecionada, setUFSelecionada] = useState<FederativeUnit | false>(false);
    const [situacaoSelecionada, setSituacaoSelecionada] = useState<Situacao | false>(false);
    const [etapaDeEnsinoSelecionada, setEtapaDeEnsinoSelecionada] = useState<EtapasDeEnsino | false>(false);
    const [municipioSelecionado, setMunicipioSelecionado] = useState<Municipio| false>(false);

    const [carregandoEscolas, setCarregandoEscolas] = useState<boolean>(false);
    const [escolasFiltradas, setEscolasFiltradas] = useState<EscolaData[] | false>(false);

    const [escolasPorPagina, setEscolasPorPagina] = useState(5);
    const [totalEscolas, setTotalEscolas] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setpaginaAtual] = useState(1);
    


    useEffect(() => {
        fetchEscolasFiltradas();

    },[nomeEscola, situacaoSelecionada, etapaDeEnsinoSelecionada, municipioSelecionado, paginaAtual])

    interface responseData {
        escolas: EscolaData[],
        escolasPorPagina: number,
        totalEscolas: number,
        totalPaginas: number
    }

    async function fetchEscolasFiltradas(): Promise <any> {
        try {
            setCarregandoEscolas(true);
          const response: AxiosResponse<responseData> = await axios.get(
            EscolasFiltradasURL,
            {params: {
                Pagina: paginaAtual,
                TamanhoPagina: escolasPorPagina,
                Nome: nomeEscola? nomeEscola: "",
                IdSituacao: situacaoSelecionada? situacaoSelecionada.id: "", 
                IdEtapaEnsino: etapaDeEnsinoSelecionada? etapaDeEnsinoSelecionada.id: "",
                IdMunicipio: municipioSelecionado? municipioSelecionado.id: ""
            }}
          );
         console.log(response.data.escolas)
          setCarregandoEscolas(false)
          setEscolasFiltradas(response.data.escolas)
          setTotalEscolas(response.data.totalEscolas)
          setTotalPaginas(response.data.totalPaginas)
          //setEscolasPorPagina
          //return response.data;
        } catch (error) {
          //throw error;
          console.log({error})
          setCarregandoEscolas(false)
          setEscolasFiltradas(false)
        }
      }
      
const mudarPagina = (incremento:number) =>{
   // if(paginaAtual + incremento >= 1 && paginaAtual + incremento <= totalPaginas)
         setpaginaAtual(valorAtual => (valorAtual + incremento))
}
useEffect(() => {setpaginaAtual(1)}, [escolasPorPagina])
const mudarQuantidadePorPaginas = (novaQuantia:number) => {
    setEscolasPorPagina(novaQuantia)

}
    const contextValue: FiltroContextType = {

        nomeEscola,
        setNomeEscola,

        UFSelecionada,
        setUFSelecionada,

        situacaoSelecionada,
        setSituacaoSelecionada,

        etapaDeEnsinoSelecionada,
        setEtapaDeEnsinoSelecionada,

        municipioSelecionado,
        setMunicipioSelecionado,

        escolasFiltradas,
        totalEscolas,
        totalPaginas,
        paginaAtual,
        mudarPagina,
        mudarQuantidadePorPaginas,
        escolasPorPagina,

    };
    return (
        <FiltroContext.Provider value={contextValue} >{children}</ FiltroContext.Provider>
    );
};

const useFiltroTabela = (): FiltroContextType => {
    const context = useContext(FiltroContext);

    if (!context) {
        throw new Error('useFiltro must be used within a FiltroProvider');
    }

    return context;
};

export { useFiltroTabela, FiltroProvider };