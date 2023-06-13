import IconGov from "../../assets/govIcon.png";
import ButtonContraste from "../../assets/icons/buttonContraste.png";

import "../components-escolasCadastradas/Header.css";

function Header() {
  return (
    <>
<header className="br-header">
  <div className="container-lg">
    <div className="header-top">
      <div className="header-logo"><img src={IconGov} alt="logo"/><span className="br-divider vertical"></span>
        <div className="header-sign">Departamento Nacional de<br></br> Infraestrutura de Transportes</div>
      </div>
      <div className="header-actions">
        <div className="header-links dropdown">
          <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Acesso Rápido"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div className="br-list">
            <div className="header">
              <div className="title">Acesso Rápido</div>
            </div></div>
        </div><span className="br-divider vertical mx-half mx-sm-1"></span>
        <div className="header-functions dropdown">
          <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Funcionalidades do Sistema"><i className="fas fa-th" aria-hidden="true"></i>
          </button>
          <div className="br-list">
            <div className="header">
            </div>
            <div className="br-item">
              <button className="br-button circle small" type="button" aria-label="Funcionalidade 4"><i className="fas fa-adjust" aria-hidden="true"></i><span className="text">Funcionalidade 4</span>
              </button>
            </div>
          </div>
        </div>
        <div className="header-search-trigger">
          <button className="br-button circle" type="button" aria-label="Abrir Busca" data-toggle="search" data-target=".header-search"><i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
       
      </div>
    </div>
    <div className="header-bottom">
      <div className="header-menu">
        <div className="header-menu-trigger">
          <button className="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="navigation"><i className="fas fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <div className="header-info">
          <div className="header-title">Nome Projeto Dnit</div>
        </div>
      </div>
      <div className="header-search">
        <div className="br-input has-icon">
          <label htmlFor="searchbox-53667">Texto da pesquisa</label>
          <input id="searchbox-53667" type="text" placeholder="O que você procura?"/>
          <button className="br-button circle small" type="button" aria-label="Pesquisar"><i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <button className="br-button circle search-close ml-1" type="button" aria-label="Fechar Busca" data-dismiss="search"><i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</header>
</>
  );
}
export default Header;
