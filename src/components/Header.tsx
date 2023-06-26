import { useNavigate } from "react-router-dom";
import IconGov from "../assets/govIcon.png";
import IconDNIT from "../assets/icons/DNITicon.svg";
import ButtonContrast from "../assets/icons/contrastButton.svg";
import "../styles/App.css";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="App-header">
      <div
        className="HeaderIcon"
        onClick={() => navigate("/escolas-cadastradas")}
        data-testid="redirecionar"
      >
        <img className="iconGov" src={IconGov} alt="ícone gov" />
        <img className="iconDNIT" src={IconDNIT} alt="ícone dnit" />
      </div>
      <div className="HeaderContrast">
        <img
          className="buttonContrast"
          src={ButtonContrast}
          alt="Button contrast"
        />
        <div className="text-alto-contraste">Alto contraste</div>
      </div>
    </header>
  );
}
