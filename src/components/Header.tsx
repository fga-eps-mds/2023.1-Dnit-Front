import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconGov from "../assets/govIcone.png";
import IconDNIT from "../assets/icons/DNITIcone.svg";
import ButtonContrast from "../assets/icons/BotaoAltoContraste.svg";
import "../styles/App.css";
interface HeaderProps {
  login?: boolean;
  dashboard?: boolean;
}

export default function Header({ login, dashboard }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="App-header">
      <div
        className="HeaderIcon"
        data-testid="redirecionar"
        onClick={() => (dashboard ? navigate("/dashboard") : navigate("/"))}
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
        {login ? (
          <Button className="button1" onClick={() => navigate("/login")}>
            Entrar
          </Button>
        ) : null}
      </div>
    </header>
  );
}
