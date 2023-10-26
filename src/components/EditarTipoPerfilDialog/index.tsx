import { useState } from "react";
import { notification } from "antd";
// import fetchExcluirPerfil from "../../service/excluiPerfil";
import Modal from "../Modal";
import ReactLoading from "react-loading";


export interface EditarTipoPerfilArgs {
  id: string | null;
  readOnly: boolean;
}

interface EditarTipoPerfilDialogProps {
  id: string | null,
  closeDialog: (edicao: boolean) => void,
}

export function EditarTipoPerfilDialog({ closeDialog }: EditarTipoPerfilDialogProps) {
  const [loading, setLoading] = useState(false);
    

    // const deletar = () => {
    //     setLoading(true);
    //     fetchExcluirPerfil(perfil.id)
    //         .then(() => {
    //             notification.success({ message: 'Perfil deletado com sucesso' });
    //             onClose(true);
    //         })
    //         .catch(error => {
    //             notification.error({ message: 'Falha na exclusão do perfil. ' + (error?.response?.data ?? '') });
    //             onClose(false);
    //         })
    //         .finally(() => setLoading(false));
    // }

    if (loading) {
      return (
        <Modal className="editar-perfil-type">
          <h4 className="text-center mt-2">Carregando Edição de Perfil... </h4>
          <div className="d-flex justify-content-center m-4">
            <ReactLoading type="spinningBubbles" color="#000000" />
          </div>
        </Modal>
      );
    }

  return (
    <Modal className="editar-perfil-type">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4>Tipo Perfil</h4> 
        <button className="br-button close circle" type="button" aria-label="Close" onClick={() => closeDialog(false)}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <p><strong>Perfil</strong></p>
      {/* inserir dropdown aqui */}
      <div className="d-flex w-100 justify-content-center">
        <button className="br-button secondary" type="button" onClick={() => closeDialog(false)}>Cancelar</button>
        <button className="br-button primary" type="button" onClick={() => {}}>Confirmar</button>
      </div>
    </Modal>
  );
}