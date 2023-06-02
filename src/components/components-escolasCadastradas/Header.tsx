import IconGov from "../../assets/govIcon.png";
import ButtonContraste from "../../assets/icons/buttonContraste.png";
import "../../styles/App.css";

function Header() {
  return (
    <><header className="App-header">
      <div className="HeaderIcon">
        <img className="iconGov" src={IconGov} alt="ícone gov" />
        <p>DNIT</p>
      </div>
      <div className="HeaderContraste">
        <img
          className="buttonContraste"
          src={ButtonContraste}
          alt="Button contraste" />
        <p>Alto contraste</p>
      </div>
    </header><header>
        <div className="header-bottom">
          <div className="header-menu">
            <div className="header-menu-trigger">
              <button className="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="navigation"><i className="fas fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div className="header-info">
              <div className="header-title">Título do Header</div>
            </div>
          </div>
          </div>
          <div className="br-input has-icon">
          <input id="searchbox-53667" type="text" placeholder="O que você procura?"/>
          <button className="br-button circle small" type="button" aria-label="Pesquisar"><i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
        </header></>
  );
}
export default Header;
