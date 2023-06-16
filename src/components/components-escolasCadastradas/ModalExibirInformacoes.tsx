import '../components-escolasCadastradas/ModalExibirInformacoes.css';
import React, { useState } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  var x = "teste modal"

  return (
    <>
      <button className="br-button primary ml-2" onClick={openModal}>Visualizar informações</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <a href="#" className="close" onClick={closeModal}>Fechar</a>
            <div>
        <div className="div br-modal large">
            <div className="br-modal-header">CED 02 de taguatinga
            </div>
            <div className="br-modal-body">
                <div className="br-input">
                    <label htmlFor="input-default">Código</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Rede</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">UF</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Município</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    <label htmlFor="input-default">Endereço</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    <label htmlFor="input-default">Telefone</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/> 
                    <label htmlFor="input-default">CEP</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Localização</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Latidudde</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Longitude</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Número total de alunos</label>
                    <input id="input-default" type="text" placeholder="Exemplo" disabled/>
                    <label htmlFor="input-default">Número total de docentes</label>
                    <input id="input-default" type="text" placeholder="Exemplo"/>
                    <div className="br-input">
                      <label htmlFor="select-simple">Situação</label>
                      <input id="select-simple" type="text" placeholder="Selecione o item"/>
                      <button className="br-button" type="button" aria-label="Exibir lista" data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="br-list" >
                      <div className="br-item">
                        <div className="br-radio">
                          <input id="rb0" type="radio" name="estados-simples" value="rb0"/>
                          <label htmlFor="rb0">Indicação</label>
                        </div>
                      </div>
                      <div className="br-item" >
                        <div className="br-radio">
                          <input id="rb1" type="radio" name="estados-simples" value="rb1"/>
                          <label htmlFor="rb1">Solicitação da escola</label>
                        </div>
                      </div>
                      <div className="br-item">
                        <div className="br-radio">
                          <input id="rb0" type="radio" name="estados-simples" value="rb0"/>
                          <label htmlFor="rb0">Jornada de crescimento do professor</label>
                        </div>
                      </div>
                      <div className="br-item" >
                        <div className="br-radio">
                          <input id="rb1" type="radio" name="estados-simples" value="rb1"/>
                          <label htmlFor="rb1">Escola crítica</label>
                        </div>
                      </div>
                        </div>
                    
                </div>
            </div>
            <div className="br-modal-footer justify-content-center">
                <button className="br-button secondary" type="button">Cancelar
                </button>
                <button className="br-button primary ml-2" type="button">Salvar
                </button>
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
