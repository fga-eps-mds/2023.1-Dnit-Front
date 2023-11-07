import { ReactNode, useEffect, useRef } from "react";
import "./styles.css";

interface ModalProps {
  className: string;
  children: ReactNode;
  closeModal: (opened: boolean) => void;
}

export default function Modal({ className = 'default', children, closeModal }: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal(false);
    }
  };

  return (
    <div  className={"overlay " + className} data-testid="overlay" onClick={handleOverlayClick}>
      <div className="br-modal medium">
        <div className="br-modal-body d-flex flex-column w-100">
          {children}
        </div>
      </div>
    </div>
  );
}
