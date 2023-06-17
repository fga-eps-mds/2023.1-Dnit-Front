import IconGov from "../assets/govIcon.png";
import IconDNIT from "../assets/icons/DNITicon.svg";
import ButtonContrast from "../assets/icons/contrastButton.svg";
import "../styles/App.css";

export default function Header() {
  return (
    <header className="App-header">
      <div className="HeaderIcon">
        <img className="iconGov" src={IconGov} alt="ícone gov" />
        <img className="iconDNIT" src={IconDNIT} alt="ícone dnit" />
      </div>
      <div className="HeaderContrast">
        <img
          className="buttonContrast"
          src={ButtonContrast}
          alt="Button contrast"
        />
        <p>Alto contraste</p>
      </div>
    </header>
  );
}