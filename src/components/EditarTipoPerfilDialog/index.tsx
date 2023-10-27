import { useState } from "react";
import { notification } from "antd";
// import fetchExcluirPerfil from "../../service/excluiPerfil";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import Select from "../Select";
import "./styles.css";


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
  const [tipoPerfil, setTipoPerfil] = useState('');
  const [selectedValue, setSelectedValue] = useState(0);
  const [notificationApi, contextHolder] = notification.useNotification();
  const items = [{id: 0, rotulo: 'Administrador'},{id: 1, rotulo: 'Basico'}, {id: 2, rotulo: 'TestePerfil'}, {id: 3, rotulo: 'Customizado'}];
  
    
  const salvarPerfil = () => {
    if (!tipoPerfil.trim()) {
      return;
    }
    setLoading(true);

    // const permissoes = categorias.flatMap(c => c.permissoes.filter(p => p.selecionada).map(p => p.codigo));
    // const perfil = {
    //   tipoPerfil: tipoPerfil.trim(),
    //   permissoes
    // };

    // fetchAtualizarTipoPerfil(id, perfil)
    //   .then(p => {
    //     notification.success({message: 'O perfil foi alterado com sucesso!'});
    //     closeDialog(p);
    //   })
    //   .catch(error => notificationApi.error({message: 'Falha na edição do perfil. ' + (error?.response?.data ?? ''), duration: 30}))
    //   .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <Modal className="modal-title">
        <h4 className="text-center mt-2">Carregando Edição de Perfil... </h4>
        <div className="d-flex justify-content-center m-4">
          <ReactLoading type="spinningBubbles" color="#000000" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal className="modal-title ">
      {contextHolder}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 className="text-center mt-1">Tipo Perfil</h4> 
        <button className="br-button close circle" type="button" aria-label="Close" onClick={() => closeDialog(false)}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>  {/*Ainda tenho duvidas se a existencia do selectedValue é pertinente. Como faz para passar a string refente ao id*/}
      <Select items={items} value={selectedValue} label={"Perfil"} onChange={setSelectedValue} inputStyle={{width: "450px"}} dropdownStyle={{width: "450px"}} buttonStyle={{left: "150px"}}
      />
      <div className="d-flex w-100 justify-content-end">
        <button className="br-button secondary" type="button" onClick={() => closeDialog(false)}>Cancelar</button>
        <button className="br-button primary" type="button" onClick={() => {}}>Confirmar</button> 
      </div>
    </Modal>
  );
}