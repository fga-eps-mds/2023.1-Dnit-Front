import  { ReactNode } from 'react'
import './styles.css'

interface ModalProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  button1Text: string;
  button2Text: string;
  confirmAction: () => void;
  closeModal: () => void;
}

export default function Modal({title, isOpen, children, button1Text, button2Text, confirmAction, closeModal } : ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" >
      <div className="br-modal medium">
        <div className="br-modal-header">
          <span>{title}</span>
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
          <button className="br-button primary ml-2" type="button" onClick={confirmAction}>
            <span>{button2Text}</span>
          </button>
        </div>
      </div>
    </div>
  );
}