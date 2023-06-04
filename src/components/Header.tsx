import IconGov from "../assets/govIcon.png";
import ButtonContrast from "../assets/icons/contrastButton.svg";
import "../styles/App.css";

export default function Header() {
  return (
    <header className="App-header">
      <div className="HeaderIcon">
        <img className="iconGov" src={IconGov} alt="ícone gov" />
        <p>DNIT</p>
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
