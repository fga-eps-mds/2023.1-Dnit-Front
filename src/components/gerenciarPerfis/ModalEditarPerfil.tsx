import { ChangeEvent, useState } from "react";
import "../../components/estilo/ModalEditarPerfil.css";

interface ModalEditarPerfilProps {
    data?: any;
    open: boolean;
    close: () => void;
  }

export default function ModalEditarPerfil({data, open, close}: ModalEditarPerfilProps) {
    const [nomePerfil, setNomePerfil] = useState(data?.nomePerfil);

    const handleNomePerfil = (event: ChangeEvent<HTMLInputElement>) => {
        setNomePerfil((event.target.value))
    };

    return open ? (
        <div className="overlay-modal">
            <div
            style={{
                zIndex: 10000,
                position: "absolute",
                top: "31%",
                left: "31%",
                right: "31%",
            }}
            >
                <div className="div br-modal large">
                    <div className="br-modal-header">Perfil:
                        <input id="input-default" type="text" placeholder="Digite o nome" onChange={handleNomePerfil} value={nomePerfil} />
                        <button className="br-button close circle" type="button" data-dismiss="br-modal" aria-label="Close" onClick={() => { close(); }}><i className="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="br-modal-body flex-column">
                        <p><strong>Permissões</strong></p>
                        <p>Collapse</p>
                    </div>
                    <div className="br-modal-footer justify-content-end">
                        <button className="br-button secondary" type="button" id="scrimfechar" data-dismiss="scrimexample"
                            onClick={() => { close(); }}>Cancelar
                        </button>
                        <button className="br-button primary ml-2" type="button"
                            onClick={() => { console.log(nomePerfil) }}>Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>) : null;
};