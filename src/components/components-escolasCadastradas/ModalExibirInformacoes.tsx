import '../components-escolasCadastradas/ModalExibirInformacoes.css';
import React, { useState } from "react";
import fetchInfoEscola from "../../service/listarInfoEscola";
import { Dropdown } from 'antd';
import ModalBody from './ModalBody';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const openModal = async () => {
    setIsModalOpen(true);

    try {
      await fetchInfoEscola({ id: 10 });
    } catch (error) {
      console.log("error");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

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
                  <ModalBody/>
                  <div className="br-modal-footer justify-content-end">
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
