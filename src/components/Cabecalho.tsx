import IconGov from "../assets/govIcone.png";
import BotaoAltoContraste from "../assets/icones/BotaoAltoContraste2.svg";
import BotaoLinks from "../assets/icones/BotaoLinks.svg"
import BotaoMenu from "../assets/icones/BotaoMenu.svg"
import LogoDNITAzul from "../assets/logoDnitAzul.png"
import "./estilo/Cabecalho.css";
import IconUsuario from "../assets/icones/usuario.svg";

interface HeaderProps {
  login?: boolean;
  dashboard?: boolean;
  title?: string;
  subtitle?: string;
}

const Header = ({ login, dashboard, title, subtitle }: HeaderProps) => {
    return (
        <header className="header">
            <div className = "top">
                <div className="grupo-esquerda">
                    <img className="gov-logo" src={IconGov}  alt='Logo gov.br'/>
                    <div className="rectangle"></div>
                    <img className="gov-logo" src={LogoDNITAzul}  alt='Logo gov.br'/>
                </div>
                <div className="grupo-direita">
                    <div className="botao-links">
                        <img src={BotaoLinks} alt='Botão de links'/>
                    </div>

                    <div className="alto-contraste-area">
                        <img src={BotaoAltoContraste} alt='Botão de alto contraste'/>
                    </div>

                    <div className="botao-login">
                        <div className="login-text">Entrar</div>
                        <img className="user-icon" src={IconUsuario} alt='Ícone representando usuário'/>
                    </div>
                </div>
            </div>
            {title && <div className="bottom">
                <div className="bottom-info">
                    <div className="menu-row">
                        <img src={BotaoMenu} className="menu" alt='Botão de Menu'/>
                        <div className="header-title">{title}</div>
                    </div>
                    <div className="bottom-text">
                        {subtitle && <div className="header-subtitle">{subtitle}</div>}
                    </div>
                </div>
            </div>}
        </header>
    );
}

export default Header;
