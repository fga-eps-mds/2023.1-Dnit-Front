import React from 'react';
import "../styles/BreadCrumb.css";
import { Link } from 'react-router-dom';

interface Pagina {
    nome: string;
    link: string;
}

interface BreadCrumbProps {
    paginaInicial: Pagina;
    elementosLi: Pagina[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ elementosLi, paginaInicial }) => {
    return (
        <div className="br-breadcrumb">
            <ul className="crumb-list">
                <li className="crumb home"><Link className="br-button circle" to={paginaInicial.link}><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                {elementosLi.map(Pagina => (
                    <li className="crumb" key={Pagina.nome + Pagina.link} ><i className="icon fas fa-chevron-right"></i><a href={Pagina.link}>{Pagina.nome}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreadCrumb;