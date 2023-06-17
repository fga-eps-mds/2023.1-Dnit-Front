import '../components-escolasCadastradas/ModalExibirInformacoes.css';
import React, { useState } from "react";
import fetchInfoEscola from "../../service/listarInfoEscola";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async () => {
    setIsModalOpen(true);
    const InfoEscolaData = {
      idEscola: 10
    };
    console.log(InfoEscolaData);
    try{
      await fetchInfoEscola(InfoEscolaData);
    } catch (error) {
      console.log("error");
    }
 };

  const closeModal = () => {
    setIsModalOpen(false);
  };

//const Dropdown = () => {
  //const openDropdown = () =>{
  //  setIsDropdownOpen(true);
 // }
//}

  return (
    <>
      <button className="br-button primary ml-2" onClick={openModal}>Visualizar informações</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            
            <div>
        <div className="container">
        <div className="div br-modal large">
            <div className="br-modal-header">CED 02 de taguatinga
            </div>
            <div className="br-modal-body">
                <div className="br-input">
                    <label htmlFor="input-default">Código</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-barcode" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Rede</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-school" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">UF</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Município</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-city" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    </div>
                    <label htmlFor="input-default">Endereço</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-home" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    </div>
                    <label htmlFor="input-default">Telefone</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-phone" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    </div>
                    <label htmlFor="input-default">CEP</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-thumbtack" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Localização</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Latidudde</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Longitude</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-default">Número total de alunos</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    </div>
                    <label htmlFor="input-icon">Número total de docentes</label>
                    <div className="input-group">
                    <div className="input-icon"><i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <input id="input-default" type="text" placeholder="Exemplo"/>
                    </div>

                    <div className="br-input">
                      <label htmlFor="select-simple">Situação</label>
                      <input id="select-simple" type="text" placeholder="Selecione o item"/>
                      <button className="br-button" type="button" aria-label="Exibir lista" data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="br-list" tabIndex={0}>
                      <div className="br-item" tabIndex={-1}>
                        <div className="br-radio">
                          <input id="rb0" type="radio" name="estados-simples" value="rb0"/>
                          <label htmlFor="rb0">Indicação</label>
                        </div>
                      </div>
                      <div className="br-item" tabIndex={-1}>
                        <div className="br-radio">
                          <input id="rb1" type="radio" name="estados-simples" value="rb1"/>
                          <label htmlFor="rb1">Solicitação da escola</label>
                        </div>
                      </div>
                      <div className="br-item" tabIndex={-1}>
                        <div className="br-radio">
                          <input id="rb2" type="radio" name="estados-simples" value="rb2"/>
                          <label htmlFor="rb2">Jornada de crescimento do professor</label>
                        </div>
                      </div>
                      <div className="br-item" tabIndex={-1}>
                        <div className="br-radio">
                          <input id="rb3" type="radio" name="estados-simples" value="rb3"/>
                          <label htmlFor="rb3">Escola crítica</label>
                        </div>
                      </div>
                      <div className="br-item" tabIndex={-1}>
                        <div className="br-radio">
                          <input id="rb4" type="radio" name="estados-simples" value="rb4"/>
                          <label htmlFor="rb4">Remover Situacao</label>
                        </div>
                      </div>
                        </div>
                        <label htmlFor="input-icon">Observacao</label>
                        <div className="input-group">
                        <div className="input-icon"><i className="fas fa-info-circle" aria-hidden="true"></i>
                        </div>
                        <input id="input-default" type="text" placeholder="Exemplo"/>
                        </div>
                    
                </div>
            </div>
            <div className="br-modal-footer justify-content-center">
                <button className="br-button secondary" type="button" onClick={closeModal}>Cancelar
                </button>
                <button className="br-button primary ml-2" type="button">Salvar
                </button>
            </div>
        </div>
        </div>
        </div>
        </div>
            
          </div>
      )}
    </>
  );
};

export default Modal;
