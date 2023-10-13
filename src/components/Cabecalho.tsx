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

            <div className = "top">
                <div className="grupo-esquerda">
                    <img className="gov-logo" src={IconGov}  alt='Logo gov.br'/>
                    <div className="rectangle"></div>
                    <p className="title-header">Departamento Nacional de Infraestrutura de Transportes</p>
                    {/* Não sei se esse anchor é necessário*/}
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

            <div className="bottom">
                <div className="bottom-info">
                    <div className="menu">
                        <img src={BotaoMenu} alt='Botão de Menu'/>
                    </div>

                    {/* Não consigo colocar esses como h1 e h2 direito*/}
                    <div className="bottom-text">
                        <div className="header-title">Título Header</div>
                        <div className="header-subtitle">Subtitulo Header</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
