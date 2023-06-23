import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import { EscolaData, FederativeUnit, Situacao, EtapasDeEnsino, Municipio} from '../models/service';
import axios, { AxiosResponse } from 'axios';
import { EscolasFiltradasURL } from '../consts/service';

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
    


    useEffect(() => {
        fetchEscolasFiltradas();

    },[nomeEscola, situacaoSelecionada, etapaDeEnsinoSelecionada, municipioSelecionado])

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
                Pagina: 1,
                TamanhoPagina: 5,
                Nome: nomeEscola? nomeEscola: "",
                IdSituacao: situacaoSelecionada? situacaoSelecionada.id: "", 
                IdEtapaEnsino: etapaDeEnsinoSelecionada? etapaDeEnsinoSelecionada.id: "",
                IdMunicipio: municipioSelecionado? municipioSelecionado.id: ""
            }}
          );
         console.log(response.data.escolas)
          setCarregandoEscolas(false)
          setEscolasFiltradas(response.data.escolas)
          setTotalEscolas
          setTotalPaginas
          setEscolasPorPagina
          //return response.data;
        } catch (error) {
          //throw error;
          console.log({error})
          setCarregandoEscolas(false)
          setEscolasFiltradas(false)
        }
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