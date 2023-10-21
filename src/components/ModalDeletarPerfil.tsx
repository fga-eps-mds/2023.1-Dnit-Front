import React, { useState } from 'react';

interface MensagemProps {
  title: string;
  userName: string;
  userQuantity: string;
  action1: string;
  action2: string;
  onClose?: () => void;
}

function ModalDeletarPerfil(props: MensagemProps) {
    
    const { title, userName, userQuantity, action1, action2, onClose } = props;
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
    };

    const modalStyle = {
        height: '165px'
    };

    return (
      isVisible ? (  
      <div className={`div br-modal ${isVisible ? 'show' : ''}`} style={modalStyle}>
      <div className="br-modal-header">{props.title}</div>
      <div className="br-modal-body">
        <p>O perfil <strong>{props.userName}</strong> é usado por {props.userQuantity} usuários.</p>
      </div>
      <div className="br-modal-footer justify-content-end">
        <button className="br-button secondary" type="button" onClick={handleClose}>{props.action1}</button>
        <button className="br-button primary ml-2" type="button" onClick={handleClose}>{props.action2}</button>
      </div>
      </div>
      ) : null
    );
}

export default ModalDeletarPerfil;

