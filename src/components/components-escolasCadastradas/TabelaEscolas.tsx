import "../../styles/App.css";
import "../components-escolasCadastradas/TabelaEscolas.css";

export default function TabelaEscolas() {
  return (
    <div className="container inputs">
      <div className="br-input medium input-button">
        <label htmlFor="input-search-medium">Nome</label>
        <input id="input-search-medium" type="search" placeholder="Digite o nome da Escola" />
        <button className="br-button" type="button" aria-label="Buscar">
          <i className="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>

      <div className="br-select">
        <div className="br-input">
          <label htmlFor="select-simple">UF</label>
          <input id="select-simple" type="text" placeholder="Selecione o item" />
          <button className="br-button" type="button" aria-label="Exibir lista" data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Situação</label>
          <input id="select-multtiple" type="text" placeholder="Todas" />
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Etapas de Ensino</label>
          <input id="select-multtiple" type="text" placeholder="Todas" />
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Município</label>
          <input id="select-multtiple" type="text" placeholder="Todas" />
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}