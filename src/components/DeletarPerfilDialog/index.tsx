import { useState } from "react";
import { notification } from "antd";
import fetchExcluirPerfil from "../../service/excluiPerfil";
import Modal from "../Modal";
import ReactLoading from "react-loading";


export interface DeletarPerfilArgs {
    id: string;
    nome: string;
}

interface DeletarPerfilDialogProps {
    perfil: DeletarPerfilArgs,
    onClose: (deletou: boolean) => void;
}

export function DeletarPerfilDialog({ perfil, onClose }: DeletarPerfilDialogProps) {
    const [loading, setLoading] = useState(false);

    const deletar = () => {
        setLoading(true);
        fetchExcluirPerfil(perfil.id)
            .then(() => {
                notification.success({ message: 'Perfil deletado com sucesso' });
                onClose(true);
            })
            .catch(error => {
                notification.error({ message: 'Falha na exclusão do perfil. ' + (error?.response?.data || '') });
                onClose(false);
            })
            .finally(() => setLoading(false));
    }

    if (loading) {
        return (
            <Modal className="delete-perfil">
                <h4 className="text-center mt-2">Deletando perfil {perfil.nome}...</h4>
                <div className="d-flex justify-content-center m-4">
                    <ReactLoading type="spinningBubbles" color="#000000" />
                </div>
            </Modal>
        );
    }

    return (
        <Modal className="delete-perfil">
            <h4 className="text-center mt-2">Tem certeza que deseja remover o perfil {perfil.nome}?</h4>
            <div className="d-flex w-100 justify-content-center">
                <button className="br-button secondary" type="button" onClick={() => onClose(false)}>Cancelar</button>
                <button className="br-button primary" type="button" onClick={() => deletar()}>Confirmar</button>
            </div>
        </Modal>
    );
}