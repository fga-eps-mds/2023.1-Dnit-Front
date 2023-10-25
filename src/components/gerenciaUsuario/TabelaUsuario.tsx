import { notification } from "antd";
import { useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { EscolaData } from "../../models/service";
// import ExibirInhtmlFormacoesEscola from "../../pages/ExibirInhtmlFormacoesEscola";
import "../../styles/App.css";
import "../estilo/TabelaUsuario.css";

interface TabelaUsuarioProps {
  nome?: string;
  idade?: number;
  endereco?: object;
  checked?: boolean;
}


export default function TabelaUsuario(props: TabelaUsuarioProps){
  return (
    <div className="br-table" data-search="data-search" data-selection="data-selection" data-collapse="data-collapse" data-random="data-random">
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">Título da Tabela</div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle" type="button" title="Ver mais opções" data-toggle="dropdown" data-target="target01-33252" aria-label="Ver mais opções"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target01-33252">
              <button className="br-item" type="button" data-density="small">Densidade alta
              </button><span className="br-divider"></span>
              <button className="br-item" type="button" data-density="medium">Densidade média
              </button><span className="br-divider"></span>
              <button className="br-item" type="button" data-density="large">Densidade baixa
              </button>
            </div>
          </div>
          <div className="search-trigger">
            <button className="br-button circle" type="button" data-toggle="search" aria-label="Abrir busca"><i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="search-bar">
          <div className="br-input">
            <label htmlFor="table-searchbox-33252">Buscar</label>
            <input id="table-searchbox-33252" type="text" placeholder="Buscar na tabela"/>
            <button className="br-button circle" type="button" aria-label="Buscar"><i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <button className="br-button circle" type="button" data-dismiss="search" aria-label="Fechar busca"><i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="selected-bar">
          <div className="info"><span className="count">0</span><span className="text">item selecionado</span></div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle inverted" type="button" data-toggle="dropdown" data-target="target02-33252" aria-label="Ver mais opções"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target02-33252">
              <button className="br-item" type="button" data-toggle="">Ação 1
              </button><span className="br-divider"></span>
              <button className="br-item" type="button">Ação 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>Título da Tabela</caption>
        <thead>
          <tr>
            <th className="column-collapse" scope="col"></th>
            <th className="column-checkbox" scope="col">
              <div className="br-checkbox hidden-label">
                <input id="check-all-33252" name="check-all-33252" type="checkbox" aria-label="Selecionar tudo" data-parent="check-01-33252"/>
                <label>Selecionar todas as linhas</label>
              </div>
            </th>
            <th scope="col">Título coluna 1</th>
            <th scope="col">Título coluna 2</th>
            <th scope="col">Título coluna 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              
            </td>
            <td>
              <div className="br-checkbox hidden-label">
                <input id="check-line-1-33252" name="check-line-1-33252" type="checkbox" aria-label="Selecionar linha 1" data-child="check-01-33252"/>
                <label>Selecionar linha 1</label>
              </div>
            </td>
            <td data-th="Título coluna 1">Linha 1 coluna 1</td>
            <td data-th="Título coluna 2">Linha 1 coluna 2</td>
            <td data-th="Título coluna 3">Linha 1 coluna 3</td>
          </tr>
          <tr className="collapse">
            <td id="collapse-1-4-33252" aria-hidden="true" colSpan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
          </tr>
          <tr>
            <td>
              <button className="br-button circle small" type="button" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-2-4-33252"><i className="fas fa-chevron-down" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <div className="br-checkbox hidden-label">
                <input id="check-line-2-33252" name="check-line-2-33252" type="checkbox" aria-label="Selecionar linha 2" data-child="check-01-33252"/>
                <label htmlFor="check-line-2-33252">Selecionar linha 2</label>
              </div>
            </td>
            <td data-th="Título coluna 1">Linha 2 coluna 1</td>
            <td data-th="Título coluna 2">Linha 2 coluna 2</td>
            <td data-th="Título coluna 3">Linha 2 coluna 3</td>
          </tr>
          <tr className="collapse">
            <td id="collapse-2-4-33252" aria-hidden="true" colSpan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
          </tr>
          <tr>
            <td>
              <button className="br-button circle small" type="button" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-3-4-33252"><i className="fas fa-chevron-down" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <div className="br-checkbox hidden-label">
                <input id="check-line-3-33252" name="check-line-3-33252" type="checkbox" aria-label="Selecionar linha 3" data-child="check-01-33252"/>
                <label >Selecionar linha 3</label>
              </div>
            </td>
            <td data-th="Título coluna 1">Linha 3 coluna 1</td>
            <td data-th="Título coluna 2">Linha 3 coluna 2</td>
            <td data-th="Título coluna 3">Linha 3 coluna 3</td>
          </tr>
          <tr className="collapse">
            <td id="collapse-3-4-33252" aria-hidden="true" colSpan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
          </tr>
        </tbody>
      </table>
      <div className="table-footer">
        <nav className="br-pagination" aria-label="Paginação de resultados" data-total="50" data-current="1" data-per-page="20">
          <div className="pagination-per-page">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="per-page-selection-random-15367">Exibir</label>
                <input id="per-page-selection-random-15367" type="text" placeholder=" "/>
                <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
              </div>
              <div className="br-list" tabIndex={0}>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="per-page-10-random-15367" type="radio" name="per-page-random-15367" value="per-page-10-random-15367" checked={true}/>
                    <label htmlFor="per-page-10-random-15367">10</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="per-page-20-random-15367" type="radio" name="per-page-random-15367" value="per-page-20-random-15367"/>
                    <label htmlFor="per-page-20-random-15367">20</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="per-page-30-random-15367" type="radio" name="per-page-random-15367" value="per-page-30-random-15367"/>
                    <label htmlFor="per-page-30-random-15367">30</label>
                  </div>
                </div>
              </div>
            </div>
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex"><span className="current">1</span>&ndash;<span className="per-page">20</span>&nbsp;de&nbsp;<span className="total">50</span>&nbsp;itens</div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="go-to-selection-random-33187">Página</label>
                <input id="go-to-selection-random-33187" type="text" placeholder=" "/>
                <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
              </div>
              <div className="br-list" tabIndex={0}>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="go-to-1-random-33187" type="radio" name="go-to-random-33187" value="go-to-1-random-33187" checked={true}/>
                    <label htmlFor="go-to-1-random-33187">1</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="go-to-2-random-33187" type="radio" name="go-to-random-33187" value="go-to-2-random-33187"/>
                    <label htmlFor="go-to-2-random-33187">2</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input id="go-to-3-random-33187" type="radio" name="go-to-random-33187" value="go-to-3-random-33187"/>
                    <label htmlFor="go-to-3-random-33187">3</label>
                  </div>
                </div>
              </div>
            </div>
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button className="br-button circle" type="button" aria-label="Voltar página"><i className="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button className="br-button circle" type="button" aria-label="Avançar página"><i className="fas fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
