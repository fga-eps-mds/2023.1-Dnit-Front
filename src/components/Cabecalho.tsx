import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconGov from "../assets/govIcone.png";
import BotaoAltoContraste from "../assets/icones/BotaoAltoContraste2.svg";
import BotaoLinks from "../assets/icones/BotaoLinks.svg"
import BotaoMenu from "../assets/icones/BotaoMenu.svg"
import "./estilo/Cabecalho.css";
import IconUsuario from "../assets/icones/usuario.svg";
import React from "react";
interface HeaderProps {
  login?: boolean;
  dashboard?: boolean;
}

const Header = ({ login, dashboard }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <header className="header">

            <div className="grupo-esquerda">
                <p className="title-header">Departamento Nacional de Infraestrutura de Transportes</p>
                {/* Não sei se esse anchor é necessário*/}
                <a>
                    <img className="gov-logo" src={IconGov}  alt='Logo gov.br'/>
                </a>
            </div>

            <div className="rectangle"></div>

            <div className="botao-links">
                <img src={BotaoLinks} alt='Botão de links'/>
            </div>

            {/* Projeto anterior não colocou botões dentro dos divs,
                Mas os botões também não tinham nenhuma funcionalidade, não sei o que fazer,
                Botões respeitam o HTML semântico*/}
            <div className="alto-contraste-area">
                <img src={BotaoAltoContraste} alt='Botão de alto contraste'/>
            </div>

            <div className="botao-login">
                <div className="login-text">Entrar</div>
                <img className="user-icon" src={IconUsuario} alt='Ícone representando usuário'/>
            </div>

            <div className="menu">
                <img src={BotaoMenu} alt='Botão de Menu'/>
            </div>

            {/* Não consigo colocar esses como h1 e h2 direito*/}
            <div className="header-title">Título Header</div>
            <div className="header-subtitle">Subtitulo Header</div>

        </header>
    );
}

export default Header;
