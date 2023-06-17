import Dropdown from "./Dropdown";
import React, { useState } from "react";

const ModalBody = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className="br-modal-body">
            <div className="br-input">
                <label htmlFor="input-default">Código</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-barcode" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Rede</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-school" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">UF</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Município</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-city" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Endereço</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-home" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Telefone</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-phone" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">CEP</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-thumbtack" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Localização</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Latidudde</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Longitude</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-default">Número total de alunos</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled />
                </div>
                <label htmlFor="input-icon">Número total de docentes</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" />
                </div>

                <div className="br-input">
                    <label htmlFor="select-simple">Situação</label>
                    <input id="select-simple" type="text" placeholder="Selecione o item" />
                    <button className="br-button" type="button" aria-label="Exibir lista" data-trigger="data-trigger" onClick={openDropdown}><i className="fas fa-angle-down" aria-hidden="true"></i>
                    </button>
                </div>
                {isDropdownOpen &&
                    <Dropdown />
                }
                <label htmlFor="input-icon">Observacao</label>
                <div className="input-group">
                    <div className="input-icon"><i className="fas fa-info-circle" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" />
                </div>

            </div>
        </div>
    )
}

export default ModalBody;