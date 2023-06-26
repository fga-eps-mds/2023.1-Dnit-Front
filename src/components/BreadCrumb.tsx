import React from 'react';
import "../styles/BreadCrumb.css";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

interface Pagina {
    nome: string;
    link: string;
}

interface BreadCrumbProps {
    paginaInicial: Pagina;
    elementosLi: Pagina[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ elementosLi, paginaInicial }) => {
    const navigate = useNavigate();
    return (
        <div className="br-breadcrumb">
            <ul className="crumb-list">
                <li className="crumb home"><Link className="br-button circle" to={paginaInicial.link}><span className="sr-only">Página inicial</span><i className="fas fa-home"></i></Link></li>
                {elementosLi.map(Pagina => (
                    <li className="crumb" key={Pagina.nome + Pagina.link} ><i className="icon fas fa-chevron-right"></i><a href={Pagina.link}>{Pagina.nome}</a>
                    </li>
                ))}
            </ul>

            <Button className='button1' onClick={() => navigate('/cadastrarescola') }>Cadastrar escolas</Button>
        </div>
    );
};

export default BreadCrumb;