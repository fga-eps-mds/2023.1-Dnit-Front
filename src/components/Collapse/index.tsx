import React, {ReactNode, useState} from 'react';
import "./style.css"

interface CollapseInterface {
    titulo: string
    opcoes: string[];
}

const CollapseCustom = (props : CollapseInterface) => {
    const {titulo, opcoes} = props;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    
    return (
        <div className="collapse-example">
            
            <div className="align-items-center br-item" role="listitem" onClick={toggleCollapse}>
                <div className="content">
                    <div className="flex-fill">
                        
                        {/*TITULO*/}
                        
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input id="checkbox-ind1" name="checkbox-ind1" type="checkbox" aria-label="selecionar tudo" data-parent="check-01"/>
                                <label htmlFor="checkbox-ind1">{titulo}</label>
                            </div>
                        </div>
                        
                    </div>
                    <i
                        className={`fas ${isCollapsed ? 'fa-angle-down' : 'fa-angle-up'}`}
                        aria-hidden="true"
                    ></i>
                </div>
            </div>
            {isCollapsed && (
                <div className="br-list" role="list" data-sub="data-sub">
                    
                    <div className="align-items-center br-item" role="listitem">
                        <div className="row align-items-center">

                            <div className="mb-1">
                                <div className="br-checkbox">
                                    <input id="checkbox-01" name="checkbox-01" type="checkbox"  data-child="check-01"/>
                                    <label htmlFor="checkbox-01">teste 1</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <span className="br-divider"></span>
                    
                    <div className="align-items-center br-item" role="listitem">
                        <div className="row align-items-center">

                            <div className="mb-1">
                                <div className="br-checkbox">
                                    <input id="checkbox-02" name="checkbox-02" type="checkbox" data-child="check-01"/>
                                    <label htmlFor="checkbox-02">teste 1</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <span className="br-divider"></span>
                    
                </div>
            )}
        </div>
    );
  
}

export default CollapseCustom;
