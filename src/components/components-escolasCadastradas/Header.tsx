import IconGov from "../../assets/govIcon.png";
import ButtonContraste from "../../assets/icons/buttonContraste.png";
import "../../styles/App.css";

export default function Header() {
  return (
    <header className="header">
      <div className="HeaderIcon">
        <img className="iconGov" src={IconGov} alt="ícone gov" />
        <p>DNIT</p>
      </div>
      <div className="HeaderContraste">
        <img
          className="buttonContraste"
          src={ButtonContraste}
          alt="Button contraste"
        />
        <p>Alto contraste</p>
      </div>
    </header>
  );
}
