import React, { useState } from 'react';
import './style.css';

interface CollapseInterface {
    titulo: string;
    opcoes: string[];
}

const CollapseCustom = (props: CollapseInterface) => {
    const { titulo, opcoes } = props;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => { setIsCollapsed(!isCollapsed) };

    const [checkboxStates, setCheckboxStates] = useState(opcoes.map(() => false));

    const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckboxStates = opcoes.map(() => isChecked);
        setCheckboxStates(newCheckboxStates);

        const celula = document.getElementById("CollapsePai");
        const label = document.getElementById("labelCollapsePai");

        if (celula && label) {
            const novaCorFundo = celula.style.backgroundColor === "rgb(38, 112, 232)" ? "#FFFFFF" : "#2670E8";
            const novaCorTexto = celula.style.backgroundColor === "rgb(38, 112, 232)" ? "#000000" : "#FFFFFF";

            celula.style.backgroundColor = novaCorFundo;
            label.style.color = novaCorTexto;
        }
                                   
    };

    const handleChildCheckboxChange = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        const celula = document.getElementById(`conteudo-${index}`);
        const conteudo = document.getElementById(`filho-${index}`);
        const label = document.getElementById(`label-${index}`);
        
        if (celula && conteudo && label) {
            const novaCorFundo = !newCheckboxStates[index] ? "#F8F8F8" : "#2670E8";
            const novaCorTexto = !newCheckboxStates[index] ? "#000000" : "#FFFFFF";
            
            celula.style.backgroundColor = novaCorFundo;
            conteudo.style.backgroundColor = novaCorFundo;
            label.style.color = novaCorTexto;
        }
    };

    const elementosFilhos = opcoes.map((item, index) => (
        <div className="CollapseOpcoes" key={index}>
            <div className="conteudo" id={`conteudo-${index}`}>
                <div className="align-items-center br-item" role="listitem" id={`filho-${index}`}>
                    <div className="row align-items-center">
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input
                                    id={`checkbox${index}`}
                                    name={`checkbox${index}`}
                                    type="checkbox"
                                    data-child={titulo}
                                    checked={checkboxStates[index]}
                                    onChange={() => {
                                        handleChildCheckboxChange(index);
                                    }}
                                />
                                <label id={`label-${index}`} htmlFor={`checkbox${index}`} style={{ fontFamily: 'Rawline' }}>
                                    {item}
                                </label>
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
            <div className="align-items-center br-item" role="listitem" onClick={toggleCollapse} id={"CollapsePai"}>
                <div className="content"  onClick={() => console.log("teste")}>
                    <div className="flex-fill">
                        <div className="br-checkbox" >
                            <input id="checkbox-ind1" 
                                   name="checkbox-ind1" 
                                   type="checkbox" 
                                   data-parent={titulo}
                                   onChange={handleParentCheckboxChange}
                            />
                            <label htmlFor="checkbox-ind1" id={"labelCollapsePai"} style={{ fontFamily: 'Rawline, sans-serif'}}>
                                {titulo}
                            </label>
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
};

export default CollapseCustom;
