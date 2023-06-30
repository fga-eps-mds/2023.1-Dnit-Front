import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import {
  EtapasDeEnsino,
  FederativeUnit,
  Municipio,
  Situacao,
} from "../../models/service";
import fetchSituacao from "../../service/Situacao";
import fetchEtapasDeEnsino from "../../service/etapasDeEnsino";
import fetchFederativeUnit from "../../service/federativeUnit";
import fetchMunicipio from "../../service/municipio";
import "../../styles/App.css";
import "../components-escolasCadastradas/style/FiltragemTabela.css";

export default function TabelaEscolas() {
  const {
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
    carregandoEscolas,
  } = useFiltroTabela();

  
  const [UfPesquisada, setUfPesquisada] = useState("");

  const mudarNome = (e: ChangeEvent<HTMLInputElement>) => {
    setNomePesquisado(e.currentTarget.value);
  };

  const mudarUf = (e: ChangeEvent<HTMLInputElement>) => {
    setUfPesquisada(e.currentTarget.value);
  };

    console.log(UfPesquisada);

  const getUf = async () => {
    try {
      const resposta = await fetchFederativeUnit();
      setOpcoesUf(resposta);
    } catch (error) {}
  };

  useEffect(() => {
    if (opcoesUf.length == 0) getUf();
  });

  const getSituacao = async () => {
    try {
      const resposta = await fetchSituacao();
      setOpcoesSituacao(resposta);
    } catch (error) {}
  };
  useEffect(() => {
    if (opcoesSituacao.length == 0) getSituacao();
  });

  const getMunicipio = async () => {
    try {
      if (UFSelecionada) {
        const resposta = await fetchMunicipio(UFSelecionada.id);
        setOpcoesMunicipio(resposta);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (opcoesMunicipio.length == 0 || carregandoEscolas) getMunicipio();
  }, [UFSelecionada, carregandoEscolas]);

  const getEtapasDeEnsino = async () => {
    try {
      const resposta = await fetchEtapasDeEnsino();
      setOpcoesEtapasDeEnsino(resposta);
    } catch (error) {}
  };

  useEffect(() => {
    if (opcoesSituacao.length == 0) getEtapasDeEnsino();
  });
  const [showOpcoesEtapasDeEnsino, setShowOpcoesEtapasDeEnsino] =
    useState(false);
  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<
    EtapasDeEnsino[]
  >([]);

  const [showOptionsSituacao, setShowOptionsSituacao] = useState(false);
  const [opcoesSituacao, setOpcoesSituacao] = useState<Situacao[]>([]);

  const [showOptionsUF, setShowOptionsUF] = useState(false);
  const [opcoesUf, setOpcoesUf] = useState<FederativeUnit[]>([]);

  const [showOpcoesMunicipio, setShowOpcoesMunincipio] = useState(false);
  const [opcoesMunicipio, setOpcoesMunicipio] = useState<Municipio[]>([]);

  const alternarEstado = (valorAtual: boolean) => !valorAtual;

  const handleButtonClick = (selectNumber: number) => {
    switch (selectNumber) {
      case 1:
        setShowOptionsUF(alternarEstado);
        break;
      case 2:
        setShowOptionsSituacao(alternarEstado);
        break;
      case 3:
        setShowOpcoesEtapasDeEnsino(alternarEstado);
        break;
      case 4:
        setShowOpcoesMunincipio(alternarEstado);
        break;
    }
  };

  const handleOptionClick = (option: any, selectNumber: number) => {
    switch (selectNumber) {
      case 1:
        setUFSelecionada(option);
        setShowOptionsUF(false);
        break;
      case 2:
        setSituacaoSelecionada(option);
        setShowOptionsSituacao(false);
        break;
      case 3:
        setEtapaDeEnsinoSelecionada(option);
        setShowOpcoesEtapasDeEnsino(false);
        break;
      case 4:
        setMunicipioSelecionado(option);
        setShowOpcoesMunincipio(false);
        break;
    }
  };

  return (
    <div className="container inputs">
      <div className="br-input medium input-button">
        <label htmlFor="input-search-medium">Nome</label>
        <input
          id="input-search-medium"
          type="search"
          value = {NomePesquisado}
          onChange={mudarNome}
          placeholder="Digite o nome da Escola"
        />
        <button
          className="br-button"
          type="button"
          aria-label="Buscar"
          data-testid="buscar-nome"
        >
          <i className="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>

      <div className="br-select">
        <div className="br-input">
          <label htmlFor="select-multtiple">UF</label>
          <input
            id="select-multtiple"
            type="text"
            value = {UfPesquisada}
            onChange={mudarUf}
            onFocus= {() =>handleButtonClick(1)}
            placeholder={UFSelecionada ? UFSelecionada.nome : "Todas"}
          />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(1)}
            data-testid="buscar-uf"
          >
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsUF && (
              <div className="select-options dropdown-busca">
                <div
                  className="options"
                  onClick={() => handleOptionClick(false, 1)}
                >
                {!UfPesquisada && "Todas"}
                  
                </div>
                {opcoesUf.filter(uf => uf.nome.toLowerCase().includes(UfPesquisada.toLowerCase()))
                .map((options, index) => {
                  return (
                    <div
                      key={index}
                      className="options"
                      onClick={() => handleOptionClick(options, 1)}
                    >
                      {options.nome}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="br-select">
        <div className="br-input">
          <label htmlFor="select-multtiple">Situação</label>
          <input
            id="select-multtiple"
            type="text"
            placeholder={
              situacaoSelecionada ? situacaoSelecionada.descricao : "Todas"
            }
          />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(2)}
            data-testid="buscar-situacao"
          >
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsSituacao && (
              <div className="select-options dropdown-busca">
                <div
                  className="options"
                  onClick={() => handleOptionClick(false, 2)}
                >
                  {" "}
                  Todas
                </div>
                {opcoesSituacao.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 2)}
                  >
                    {options.descricao}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="br-select">
        <div className="br-input">
          <label htmlFor="select-multtiple">Etapas de Ensino</label>
          <input
            id="select-multtiple"
            type="text"
            placeholder={
              etapaDeEnsinoSelecionada
                ? etapaDeEnsinoSelecionada.descricao
                : "Todas"
            }

          />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(3)}
            data-testid="buscar-etapas"
          >
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOpcoesEtapasDeEnsino && (
              <div className="select-options dropdown-busca">
                <div
                  className="options"
                  onClick={() => handleOptionClick(false, 3)}
                >
                  {" "}
                  Todas
                </div>
                {OpcoesEtapasDeEnsino.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 3)}
                  >
                    {options.descricao}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="br-select">
        <div className="br-input">
          <label htmlFor="select-multtiple">Município</label>
          <input
            id="select-multtiple"
            type="text"
            placeholder={
              municipioSelecionado ? municipioSelecionado.nome : "Todos"
            }
          />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(4)}
            data-testid="buscar-municipio"
          >
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOpcoesMunicipio && (
              <div className="select-options dropdown-busca">
                <div
                  className="options"
                  onClick={() => handleOptionClick(false, 4)}
                >
                  {" "}
                  Todos
                </div>
                {opcoesMunicipio.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 4)}
                  >
                    {options.nome}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
