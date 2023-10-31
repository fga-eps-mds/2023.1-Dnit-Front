import { notification } from "antd";
import { useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { EscolaData } from "../../models/service";
import ExibirInformacoesEscola from "./ExibirInformacoesEscola";
import "../../styles/App.css";
import "../estilo/TabelaEscola.css";

export default function TabelaEscola() {
  const {
    escolasFiltradas,
    paginaAtual,
    mudarPagina,
    escolasPorPagina,
    mudarQuantidadePorPaginas,
    totalEscolas,
  } = useFiltroTabela();

  const [, contextHolder] = notification.useNotification();

  const [opcoesPaginas, setOpcoesPaginas] = useState(false);
  const [, setMostrarEscolasPorPagina] = useState(false);
  const opcoesEscolasPorPaginas = ["2", "5", "10", "20"];
  const [escolas] = useState<EscolaData[]>([]);
  const [estadoModal, setEstadoModal] = useState(
    Array(escolas.length).fill(false)
  );
  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData>();
  const [indexescolaSelecionada, setIndexEscolaSelecionada] =
    useState<number>(0);

  const handleButtonClick = (selectNumeber: number) => {
    if (selectNumeber == 1) {
      setOpcoesPaginas(!opcoesPaginas);
    }
  };
  const handleOptionClick = (option: number) => {
    mudarQuantidadePorPaginas(option);
    setMostrarEscolasPorPagina(false);
  };

  const abrirModal = (id: EscolaData, index: number) => {
    const novosEstadosModal = [...estadoModal];
    novosEstadosModal[index] = true;
    setEstadoModal(novosEstadosModal);
    setEscolaSelecionada(id);
    setIndexEscolaSelecionada(index);
  };

  const fecharModal = (index: number) => {
    const newModalStates = [...estadoModal];
    newModalStates[index] = false;
    setEstadoModal(newModalStates);
  };

  const intervaloPagina = () => {
    const inicioIntervalo = (paginaAtual - 1) * escolasPorPagina + 1;
    let finalIntervalo = paginaAtual * escolasPorPagina;

    if (finalIntervalo > totalEscolas) finalIntervalo = totalEscolas;

    return [inicioIntervalo, finalIntervalo];
  };

  return (
    <div
      className="br-table"
      data-search="data-search"
      data-selection="data-selection"
      data-collapse="data-collapse"
      data-random="data-random"
    >
      {contextHolder}
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">Escolas Cadastradas</div>
        </div>
        <div className="search-bar">
          <div className="br-input">
            <label htmlFor="table-searchbox-27509">Buscar</label>
            <input
              id="table-searchbox-27509"
              type="text"
              placeholder="Buscar na tabela"
            />
            <button
              className="br-button circle"
              type="button"
              aria-label="Buscar"
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <button
            className="br-button circle"
            type="button"
            data-dismiss="search"
            aria-label="Fechar busca"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="selected-bar">
          <div className="info">
            <span className="count">0</span>
            <span className="text">item selecionado</span>
          </div>
          <div className="actions-trigger text-nowrap">
            <button
              className="br-button circle inverted"
              type="button"
              data-toggle="dropdown"
              data-target="target02-27509"
              aria-label="Ver mais opções"
            >
              <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target02-27509" hidden>
              <button className="br-item" type="button" data-toggle="">
                Ação 1
              </button>
              <span className="br-divider"></span>
              <button className="br-item" type="button">
                Ação 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>Escolas Cadastradas</caption>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Etapas de Ensino</th>
            <th scope="col">Total de Alunos</th>
            <th scope="col">Situação</th>
            <th scope="col">Município</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {escolasFiltradas
            ? escolasFiltradas?.map((escola, index) => {
                const etapas = Object.values(escola.etapaEnsino);
                return (
                  <tr
                    key={escola.idEscola}
                    onClick={() => abrirModal(escola, index)}
                    data-testid="linha-escola"
                  >
                    <td data-th="Título coluna 1">{escola.nomeEscola}</td>
                    <td data-th="Título coluna 2">
                      {etapas.map((etapas: any) => (
                        <span key={etapas}>
                          {etapas} <br />
                        </span>
                      ))}
                    </td>
                    <td data-th="Título coluna 3">
                      {escola.numeroTotalDeAlunos}
                    </td>
                    <td data-th="Título coluna 4">
                      {escola.descricaoSituacao}
                    </td>
                    <td data-th="Título coluna 5">{escola.nomeMunicipio}</td>
                    <td data-th="Título coluna 6">{escola.siglaUf}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      <div className="modal-informacoes">
        <ExibirInformacoesEscola
          open={estadoModal[indexescolaSelecionada]}
          escola={escolaSelecionada}
          close={() => fecharModal(indexescolaSelecionada)}
        />
      </div>

      <div className="table-footer">
        <nav
          className="br-pagination"
          aria-label="Paginação de resultados"
          data-total={escolasFiltradas ? escolasFiltradas.length : 0}
        >
          <div className="pagination-per-page">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="per-page-selection-random-91921">Exibir</label>
                <input
                  id="per-page-selection-random-91921"
                  type="text"
                  placeholder={escolasPorPagina.toString()}
                />
                <button
                  className="br-button"
                  type="button"
                  aria-label="Exibir lista"
                  tabIndex={-1}
                  data-trigger="data-trigger"
                >
                  <i
                    className="fas fa-angle-down"
                    aria-hidden="true"
                    onClick={() => handleButtonClick(1)}
                    data-testid="dropdown-exibir"
                  ></i>
                </button>
                <div className="br-input">
                  {opcoesPaginas && (
                    <div className="select-options dropdown-pagina">
                      {opcoesEscolasPorPaginas.map((opcoes, index) => (
                        <div
                          key={opcoes}
                          className="options"
                          onClick={() => handleOptionClick(Number(opcoes))}
                          data-testid={`options-${opcoes}`}
                          onKeyDown={() => {}}
                        >
                          {opcoes}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex">
            <span className="current">{intervaloPagina()[0]}</span>&ndash;
            <span className="per-page">{intervaloPagina()[1]}</span>&nbsp;de&nbsp;
            <span className="total">{totalEscolas}</span>&nbsp;itens
          </div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="go-to-selection-random-15337">Página</label>
                <input
                  id="go-to-selection-random-15337"
                  type="text"
                  placeholder={paginaAtual.toString()}
                  disabled
                />
              </div>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button
              className="br-button circle"
              type="button"
              aria-label="Voltar página"
              onClick={() => mudarPagina(-1)}
            >
              <i
                className="fas fa-angle-left"
                aria-hidden="true"
                data-testid="voltar-pagina"
              ></i>
            </button>
            <button
              className="br-button circle"
              type="button"
              aria-label="Avançar página"
              onClick={() => mudarPagina(1)}
            >
              <i
                className="fas fa-angle-right"
                aria-hidden="true"
                data-testid="avancar-pagina"
              ></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
