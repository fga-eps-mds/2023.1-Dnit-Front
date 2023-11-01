import { Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { UnidadeFederativaData, MunicipioData, SituacaoData } from "../../models/service";
import {fetchSituacao} from "../../service/receptor";
import {fetchEtapasDeEnsino} from "../../service/receptor";
import {fetchUnidadeFederativa} from "../../service/receptor";
import {fetchMunicipio} from "../../service/receptor";
import "../../styles/App.css";
import "../estilo/FiltragemTabela.css";

export default function TabelaEscolas() {
  const {
    NomePesquisado,
    setNomePesquisado,

    UFSelecionada,
    setUFSelecionada,

    situacaoSelecionada,
    setSituacaoSelecionada,

    setEtapaDeEnsinoSelecionada,

    municipioSelecionado,
    setMunicipioSelecionado,
    carregandoEscolas,
  } = useFiltroTabela();

  const [UfPesquisada, setUfPesquisada] = useState("");
  const [SituacaoPesquisada, setSituacaoPesquisada] = useState("");
  const [MunicipioPesquisado, setMunicipioPesquisado] = useState("");

  const mudarNome = (e: ChangeEvent<HTMLInputElement>) => {
    setNomePesquisado(e.currentTarget.value);
  };

  const mudarUf = (e: ChangeEvent<HTMLInputElement>) => {
    setUfPesquisada(e.currentTarget.value);
  };

  const mudarSituacao = (e: ChangeEvent<HTMLInputElement>) => {
    setSituacaoPesquisada(e.currentTarget.value);
  };

  const mudarEtapa = (e: number[]) => {
    setEtapaDeEnsinoSelecionada(e);
  };

  const mudarMunicipio = (e: ChangeEvent<HTMLInputElement>) => {
    setMunicipioPesquisado(e.currentTarget.value);
  };

  const getUf = async () => {
    try {
      const resposta = await fetchUnidadeFederativa();
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
      const etapas = resposta.map((e) => ({ label: e.descricao, value: e.id }));
      setOpcoesEtapasDeEnsino(etapas);
    } catch (error) {}
  };

  useEffect(() => {
    if (opcoesSituacao.length == 0) getEtapasDeEnsino();
  });
  const [, setShowOpcoesEtapasDeEnsino] = useState(false);
  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<
    { value: number; label: string }[]
  >([]);

  const [showOptionsSituacao, setShowOptionsSituacao] = useState(false);
  const [opcoesSituacao, setOpcoesSituacao] = useState<SituacaoData[]>([]);

  const [showOptionsUF, setShowOptionsUF] = useState(false);
  const [opcoesUf, setOpcoesUf] = useState<UnidadeFederativaData[]>([]);

  const [showOpcoesMunicipio, setShowOpcoesMunincipio] = useState(false);
  const [opcoesMunicipio, setOpcoesMunicipio] = useState<MunicipioData[]>([]);

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
    <>
      <div className="container inputs">
        <div className="br-input medium input-button">
          <label htmlFor="input-search-medium">Nome</label>
          <input
            id="input-search-medium"
            type="search"
            value={NomePesquisado}
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
              value={UfPesquisada}
              onChange={mudarUf}
              onFocus={() => handleButtonClick(1)}
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
                    onKeyDown={() => {}}
                  >
                    {!UfPesquisada && "Todas"}
                  </div>
                  {opcoesUf
                    .filter((uf) =>
                      uf.nome.toLowerCase().includes(UfPesquisada.toLowerCase())
                    )
                    .map((options, index) => {
                      return (
                        <div
                          key={options.id}
                          className="options"
                          onClick={() => handleOptionClick(options, 1)}
                          onKeyDown={() => {}}
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
              value={SituacaoPesquisada}
              onChange={mudarSituacao}
              onFocus={() => handleButtonClick(2)}
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
                    onKeyDown={() => {}}
                  >
                    {!SituacaoPesquisada && "Todas"}
                  </div>
                  {opcoesSituacao
                    .filter((situacao) =>
                      situacao.descricao
                        .toLowerCase()
                        .includes(SituacaoPesquisada.toLowerCase())
                    )
                    .map((options, index) => (
                      <div
                        key={options.id}
                        className="options"
                        onClick={() => handleOptionClick(options, 2)}
                        onKeyDown={() => {}}
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
              value={MunicipioPesquisado}
              onChange={mudarMunicipio}
              onFocus={() => handleButtonClick(4)}
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
                    onKeyDown={() => {}}
                  >
                    {!MunicipioPesquisado && "Todos"}
                  </div>
                  {opcoesMunicipio
                    .filter((municipio) =>
                      municipio.nome
                        .toLowerCase()
                        .includes(MunicipioPesquisado.toLowerCase())
                    )
                    .map((options, index) => (
                      <div
                        key={options.id}
                        className="options"
                        onClick={() => handleOptionClick(options, 4)}
                        onKeyDown={() => {}}
                      >
                        {options.nome}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="br-select">
          <div>
            <label htmlFor="select-multtiple">Etapas de Ensino</label>

            <Select
              mode="multiple"
              placeholder="Todas"
              onChange={mudarEtapa}
              onMouseDown={getEtapasDeEnsino}
              onClick={getEtapasDeEnsino}
              options={OpcoesEtapasDeEnsino}
              className="select-etapas"
              showSearch={false}
              data-testid="buscar-etapas"
            />
          </div>
        </div>
      </div>
    </>
  );
}
