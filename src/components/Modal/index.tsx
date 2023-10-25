import { ReactNode } from "react";
import "./styles.css";

interface ModalProps {
  className: string;
  children: ReactNode;
}

export default function Modal({ className = "default", children }: ModalProps) {
  return (
    <div className={"overlay " + className} data-testid="overlay">
      <div className="br-modal medium">
        <div className="br-modal-body d-flex flex-column w-100">{children}</div>
      </div>
    </div>
  );
}
