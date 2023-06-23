import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { EscolaData, FederativeUnit, Situacao, EtapasDeEnsino, Municipio} from '../models/service';

interface FiltroContextType {
    nomeEscola: string;
    setNomeEscola: Dispatch<SetStateAction<string>>;

    UFSelecionada: FederativeUnit | false;
    setUFSelecionada: Dispatch<SetStateAction<FederativeUnit | false>>

    situacaoSelecionada: Situacao | false;
    setSituacaoSelecionada: Dispatch<SetStateAction<Situacao | false>>;

    etapaDeEnsionoSelecionada: EtapasDeEnsino | false;
    setEtapaDeEnsionoSelecionada: Dispatch<SetStateAction<EtapasDeEnsino | false>>;

    municipioSelecionado: Municipio | false;
    setMunicipioSelecionado: Dispatch<SetStateAction<Municipio | false>>;


}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

const FiltroProvider = ({ children }: any) => {

    const [nomeEscola, setNomeEscola] = useState("");
    const [UFSelecionada, setUFSelecionada] = useState<FederativeUnit | false>(false);
    const [situacaoSelecionada, setSituacaoSelecionada] = useState<Situacao | false>(false);
    const [etapaDeEnsionoSelecionada, setEtapaDeEnsionoSelecionada] = useState<EtapasDeEnsino | false>(false);
    const [municipioSelecionado, setMunicipioSelecionado] = useState<Municipio| false>(false);

    const [carregandoEscolas, setCarregandoEscolas] = useState<boolean>(false);
    const [escolasFiltradas, setEscolasFiltradas] = useState<EscolaData | false>(false);



    const contextValue: FiltroContextType = {

        nomeEscola,
        setNomeEscola,

        UFSelecionada,
        setUFSelecionada,

        situacaoSelecionada,
        setSituacaoSelecionada,

        etapaDeEnsionoSelecionada,
        setEtapaDeEnsionoSelecionada,

        municipioSelecionado,
        setMunicipioSelecionado,
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