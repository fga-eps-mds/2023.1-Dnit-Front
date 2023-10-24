import { ReactNode } from 'react'
import './styles.css'
import { ChangeEvent } from "react";

interface ModalProps {
  setNomePerfil: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  children: ReactNode;
  button1Text: string;
  button2Text: string;
  mostrarConfirmacao: boolean;
  confirmAction: () => void;
  closeModal: () => void;
}

export default function Modal({ setNomePerfil, isOpen, children, button1Text, button2Text, mostrarConfirmacao, confirmAction, closeModal }: ModalProps) {
  if (!isOpen) return null;

  const handleNomePerfil = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setNomePerfil(event.target.value);
  };

  return (
    <div className="overlay" >
      <div className="br-modal medium">
        <div className="br-modal-header">
          <span><div>Perfil:
            <input id="input-default" type="text" placeholder="Digite o nome" onChange={handleNomePerfil} />
          </div></span>
          <button className="br-button close circle" type="button" data-dismiss="br-modal" aria-label="Close" onClick={closeModal}>
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="br-modal-body">
          {children}
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button secondary" type="button" onClick={closeModal}>
            <span>{button1Text}</span>
          </button>
          <button className="br-button primary ml-2" type="button" onClick={confirmAction} disabled={!mostrarConfirmacao}>
            <span>{button2Text}</span>
          </button>
        </div>
      </div>
    </div>
  );
}