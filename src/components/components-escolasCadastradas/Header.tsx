import IconGov from "../../assets/govIcon.png";
import ButtonContraste from "../../assets/icons/buttonContraste.png";
import Header2 from "../../components/Header";

import "../components-escolasCadastradas/Header.css";

function Header() {
  return (
    <>
    <Header2></Header2>
    <header className="br-header">
      <div className="container-lg">
        <div className="header-top">           
          <div className="header-actions">
            <div className="header-links dropdown">
              <div className="br-list">
                <div className="header">
                  <div className="title">Acesso Rápido</div>
                </div></div>
            </div><span className="br-divider vertical mx-half mx-sm-1"></span>
            <div className="header-functions dropdown">
            
              <div className="br-list">
                <div className="header">
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
        </div>
      </div>
    </header>
</>

  );
}
export default Header;
