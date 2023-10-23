import React, { useEffect, useState } from 'react';
import './style.css';
import { Permissao } from '../../models/auth';

export interface CollapseOpcao {
    id: string;
    nome: string;
}


export interface CollapseInterface {
    titulo: string;
    opcoes: CollapseOpcao[];
    onSelectionChange: (titulo: string, estados: boolean[]) => void,
}

const CollapseCustom = (props: CollapseInterface) => {
    const { titulo, opcoes, onSelectionChange } = props;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [checkboxStates, setCheckboxStates] = useState(opcoes.map(() => false));

    const toggleCollapse = () => { setIsCollapsed(c => !c) };


    const handleParentCheckboxChange = () => {
        setCheckboxStates(states => {
            const checked = !states.every(s => s);
            onSelectionChange(titulo, states.map(() => checked));
            return states.map(() => checked);
        });
    };

    const handleChildCheckboxChange = (index: number) => {
        setCheckboxStates(states => {
            const newStates = [...states];
            newStates[index] = !newStates[index];
            onSelectionChange(titulo, newStates);
            return newStates;
        });
    };

    const elementosFilhos = opcoes.map((item, index) => (
        <div className="CollapseOpcoes" key={`${titulo}-${item.id}`}>
            <div className="conteudo" style={{
                    backgroundColor: checkboxStates[index] ? "#2670E8" : "#ffffff"
                }}>
                <div className="align-items-center br-item" role="listitem" style={{
                    backgroundColor: 'transparent'
                }}>
                    <div className="row align-items-center">
                        <div className="mb-1">
                            <div className="br-checkbox" onClick={() => handleChildCheckboxChange(index)}>
                                <input
                                    id={`checkbox${item.id}`}
                                    name={`checkbox${item.id}`}
                                    type="checkbox"
                                    data-child={titulo}
                                    checked={checkboxStates[index]}
                                    onChange={() => {}}
                                />
                                <label htmlFor={`checkbox-${index}`} style={{fontFamily: 'Rawline', color: checkboxStates[index] ? "#FFFFFF" : "#000000"}}>{item.nome}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="br-divider"></span>
        </div>
    ));

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}>
            <div className="align-items-center br-item" role="listitem" onClick={toggleCollapse} id={`CollapsePai-${titulo}`} style={{
                backgroundColor: checkboxStates.every(s => s) ? "#2670E8" : "#ffffff"
            }}>
                <div className="content">
                    <div className="flex-fill">
                        <div className="br-checkbox" onClick={() => {handleParentCheckboxChange();}}>
                            <input
                                   name="checkbox-ind1" 
                                   type="checkbox" 
                                   data-parent={titulo}
                                   checked={checkboxStates.every(s => s)}
                                   onChange={() => {}}
                            />
                            <label htmlFor="checkbox-ind1" id={`labelCollapsePai-${titulo}`} style={{ fontFamily: 'Rawline, sans-serif'}}>
                                {titulo}
                            </label>
                        </div>
                    </div>
                    <i className={`fas ${isCollapsed ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true"></i>
                </div>
            </div>

            <span className="br-divider"></span>

            {isCollapsed && (
                <div className="d-flex flex-column w-100" role="list" data-sub="data-sub">
                    {elementosFilhos}
                </div>
            )}
        </div>
    );
};

export default CollapseCustom;
