import IconGov from "../../assets/govIcon.png";
import ButtonContrast from "../../assets/icons/contrastButton.svg";
import "../../styles/App.css";
import "../estilo/Header.css";

function Header() {
  return (
    <>
      <header className="br-header">
        <div className="container-lg">
          <div className="header-top">
            <div className="header-logo">
              <img src={IconGov} alt="logo" />
              <div className="header-sign">DNIT</div>
            </div>
            <div className="HeaderContrast">
              <img
                className="buttonContrast"
                src={ButtonContrast}
                alt="Button contrast"
              />
              <div className='text-alto-contraste'>Alto contraste</div>
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