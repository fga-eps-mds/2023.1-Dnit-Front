import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/BreadCrumb.css";

interface Pagina {
  nome: string;
  link: string;
}

interface BreadCrumbProps {
  elementosLi: Pagina[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ elementosLi }) => {
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

      <Button className="button1" onClick={() => navigate("/cadastrarescola")}>
        Cadastrar escolas
      </Button>
    </div>
  );
};

export default BreadCrumb;
