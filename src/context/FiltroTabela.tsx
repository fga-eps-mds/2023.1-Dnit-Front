import axios, { AxiosResponse } from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscolasFiltradasURL } from "../consts/service";
import {
  EscolaData,
  FederativeUnit,
  Municipio,
  Situacao,
} from "../models/service";

interface FiltroContextType {
  nomeEscola: string;
  setNomeEscola: Dispatch<SetStateAction<string>>;

  NomePesquisado: string;
  setNomePesquisado: Dispatch<SetStateAction<string>>;

  UFSelecionada: FederativeUnit | false;
  setUFSelecionada: Dispatch<SetStateAction<FederativeUnit | false>>;

  situacaoSelecionada: Situacao | false;
  setSituacaoSelecionada: Dispatch<SetStateAction<Situacao | false>>;

  etapaDeEnsinoSelecionada: number[];
  setEtapaDeEnsinoSelecionada: Dispatch<SetStateAction<number[]>>;

  municipioSelecionado: Municipio | false;
  setMunicipioSelecionado: Dispatch<SetStateAction<Municipio | false>>;

  escolasFiltradas: EscolaData[] | false;
  totalEscolas: number;
  totalPaginas: number;
  paginaAtual: number;
  mudarPagina: (incremento: number) => void;
  irParaPagina: (numeroPagina: number) => void;
  mudarQuantidadePorPaginas: (novaQuantia: number) => void;
  escolasPorPagina: number;
  fetchEscolasFiltradas: () => Promise<any>;
  carregandoEscolas: boolean;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

const FiltroProvider = ({ children }: any) => {
  const [NomePesquisado, setNomePesquisado] = useState("");
  const [nomeEscola, setNomeEscola] = useState("");

  const [UFSelecionada, setUFSelecionada] = useState<FederativeUnit | false>(
    false
  );
  const [situacaoSelecionada, setSituacaoSelecionada] = useState<
    Situacao | false
  >(false);
  const [etapaDeEnsinoSelecionada, setEtapaDeEnsinoSelecionada] = useState<
    number[]
  >([]);
  const [municipioSelecionado, setMunicipioSelecionado] = useState<
    Municipio | false
  >(false);

  const [carregandoEscolas, setCarregandoEscolas] = useState<boolean>(false);
  const [escolasFiltradas, setEscolasFiltradas] = useState<
    EscolaData[] | false
  >(false);

  const [escolasPorPagina, setEscolasPorPagina] = useState(5);

  const [paginaAtual, setpaginaAtual] = useState(1);
  const [totalEscolas, setTotalEscolas] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [gatilho, setGatilho] = useState(false);

  const ativarGatilho = () => {
    setGatilho((valorAtual) => !valorAtual);
  };

  async function fetchEscolasFiltradas(): Promise<any> {
    try {
      setCarregandoEscolas(true);
      const idEtapaEnsinoParams = etapaDeEnsinoSelecionada.map(
        (item, index) => ({
          [`IdEtapaEnsino[${index}]`]: item,
        })
      );
      const response: AxiosResponse<responseData> = await axios.get(
        EscolasFiltradasURL,
        {
          params: {
            Pagina: paginaAtual,
            TamanhoPagina: escolasPorPagina,
            Nome: NomePesquisado ? NomePesquisado : "",
            IdSituacao: situacaoSelecionada ? situacaoSelecionada.id : "",
            IdMunicipio: municipioSelecionado ? municipioSelecionado.id : "",
            IdUf: UFSelecionada ? UFSelecionada.id : "",
            ...idEtapaEnsinoParams.reduce(
              (acc, obj) => ({ ...acc, ...obj }),
              {}
            ),
          },
        }
      );

      setCarregandoEscolas(false);
      setEscolasFiltradas(response.data.escolas);
      setTotalEscolas(response.data.totalEscolas);
      setTotalPaginas(response.data.totalPaginas);
    } catch (error) {
      setCarregandoEscolas(false);
      setEscolasFiltradas(false);
    }
  }

  const mudarPagina = (incremento: number) => {
    if (
      paginaAtual + incremento >= 1 &&
      paginaAtual + incremento <= totalPaginas
    )
      setpaginaAtual((valorAtual) => valorAtual + incremento);
  };
  const irParaPagina = (numeroPagina: number) => {
    setpaginaAtual(numeroPagina);
  };
  const mudarQuantidadePorPaginas = (novaQuantia: number) => {
    setpaginaAtual(1);

    setEscolasPorPagina(novaQuantia);
  };

  useEffect(() => {
    if (paginaAtual !== 1) setpaginaAtual(1);
    else ativarGatilho();
  }, [
    escolasPorPagina,
    nomeEscola,
    situacaoSelecionada,
    etapaDeEnsinoSelecionada,
    municipioSelecionado,
    UFSelecionada,
    NomePesquisado,
  ]);

  useEffect(() => {
    fetchEscolasFiltradas();
  }, [paginaAtual, gatilho]);

  interface responseData {
    escolas: EscolaData[];
    escolasPorPagina: number;
    totalEscolas: number;
    totalPaginas: number;
  }

  const contextValue: FiltroContextType = {
    nomeEscola,
    setNomeEscola,

    NomePesquisado,
    setNomePesquisado,

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
    irParaPagina,
    mudarQuantidadePorPaginas,
    escolasPorPagina,
    fetchEscolasFiltradas,
    carregandoEscolas,
  };
  return (
    <FiltroContext.Provider value={contextValue}>
      {children}
    </FiltroContext.Provider>
  );
};

const useFiltroTabela = (): FiltroContextType => {
  const context = useContext(FiltroContext);

  if (!context) {
    throw new Error("useFiltro must be used within a FiltroProvider");
  }

  return context;
};

export { FiltroProvider, useFiltroTabela };
