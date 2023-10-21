import React, {ReactNode, useState} from 'react';
import "./style.css"
import {H} from "msw/lib/glossary-de6278a9";

interface CollapseInterface {
    titulo: string
    opcoes: string[];
}

const CollapseCustom = (props : CollapseInterface) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    
    const {titulo, opcoes} = props;
    
    const elementosFilhos = opcoes.map((item, index) => (
        <div className={`FILHO${index}`} id={"filhos"}>
            <div className="conteudo">
                <div key={index} className="align-items-center br-item" role="listitem" id={`filho${index}`}>
                    <div className="row align-items-center">
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input
                                    id={`checkbox-${index}`}
                                    name={`checkbox-${index}`}
                                    type="checkbox"
                                    data-child="check-01"
                                />
                                <label className={`nome-${index}`} htmlFor={`checkbox-${index}`} style={{ fontFamily: 'Rawline, sans-serif'}}>{item}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <span className="br-divider"></span>
        </div>
    ));
    
    return (
        <div className="collapse-example">
            <div className="align-items-center br-item" role="listitem" onClick={toggleCollapse}>
                <div className="content">
                    <div className="flex-fill">     {/*TITULO*/}
                        
                        <div className="br-checkbox">
                            <input id="checkbox-ind1" name="checkbox-ind1" type="checkbox" aria-label="Selecionar tudo" data-parent="check-01"/>
                            <label htmlFor="checkbox-ind1">{titulo}</label>
                        </div>
                        
                    </div>
                    
                    <i className={`fas ${isCollapsed ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true"></i>
                </div>
            </div>
            <span className="br-divider"></span>
            
            {isCollapsed && (
                <div className="br-list" role="list" data-sub="data-sub">
                    {elementosFilhos}
                </div>
            )}
            
        </div>
    );
  
}

export default CollapseCustom;
