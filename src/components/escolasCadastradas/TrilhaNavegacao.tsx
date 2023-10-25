import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/TrilhaNavegacao.css";


interface Pagina {
  nome: string;
  link: string;
}

interface TrilhaNavegacaoProps {
  elementosLi: Pagina[];
  escolasCadastradas?: boolean;
}

const TrilhaDeNavegacao: React.FC<TrilhaNavegacaoProps> = ({ elementosLi, escolasCadastradas }) => {
  const navigate = useNavigate();

  return (
    <div className="br-breadcrumb">
      <ul className="crumb-list">
        <li className="crumb home">
          <Link className="br-button circle" to={"/dashboard"}>
            <span className="sr-only">Página inicial</span>
            <i className="fas fa-home"></i>
          </Link>
        </li>
        {elementosLi.map((Pagina) => (
          <li className="crumb" key={Pagina.nome + Pagina.link}>
            <i className="icon fas fa-chevron-right"></i>
            <a href={Pagina.link}>{Pagina.nome}</a>
          </li>
        ))}
      </ul>

      {escolasCadastradas? (
        <Button className="button1" onClick={() => navigate("/cadastrarescola")}>
        Cadastrar escolas
      </Button>
      ): null}
    </div>
  );
};

export default TrilhaDeNavegacao;
