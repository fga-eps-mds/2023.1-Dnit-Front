import { useEffect, useState } from "react";
import { notification } from "antd";
// import fetchExcluirPerfil from "../../service/excluiPerfil";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import Select from "../Select";
import "./styles.css";
import {fetchAtualizaTipoPerfil} from "../../service/usuarioApi";
import { UsuarioModel } from "../../models/usuario";


export interface EditarTipoPerfilArgs {
  id: string | null;
  readOnly: boolean;
}

interface FilterOptions {
  id: string;
  rotulo: string;
}
interface EditarTipoPerfilDialogProps {
  listaOpcoes: FilterOptions[];
  listaUsuarios: UsuarioModel[];
  perfilAntesAlteracao: string;
  usuarioId: string;
  closeDialog: (edicao: boolean) => void;
  atualizaTabela: (atualizou: UsuarioModel[] ) => void;
}



export function EditarTipoPerfilDialog({ closeDialog, listaOpcoes, usuarioId, listaUsuarios, atualizaTabela, perfilAntesAlteracao }: EditarTipoPerfilDialogProps) {
  const [loading, setLoading] = useState(false);
  const [tipoPerfilId, setTipoPerfilId] = useState('');
  const [notificationApi, contextHolder] = notification.useNotification();

  const salvarPerfil = (usuarioId: string, perfilId: string) => {
    if (!tipoPerfilId.trim()) {
      notification.error({ message: 'Selecione um tipo de perfil' });
      return;
    }
    setLoading(true);

    fetchAtualizaTipoPerfil(usuarioId, perfilId)
      .then(() => {
        notification.success({ message: 'O perfil foi alterado com sucesso!' });
        closeDialog(true);
      })
      .catch(error => notificationApi.error({ message: 'Falha na edição do perfil. ' + (error?.response?.data ?? ''), duration: 30 }))
      .finally(() => {
        atualizarListagemUsuarios();
        setLoading(false);
      });
  }

  function atualizarListagemUsuarios() {
    const listaUsuariosAtualizada = listaUsuarios.map((usuario) => {
      if(usuario.id === usuarioId) return { ...usuario,  perfilId: tipoPerfilId }
      return usuario;
    });

    atualizaTabela(listaUsuariosAtualizada);
     
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 className="text-center mt-1">Tipo Perfil</h4>
        <button data-testid="botaoFechar" className="br-button close circle" type="button" aria-label="Close" onClick={() => closeDialog(false)}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <Select 
        items={listaOpcoes} 
        value={tipoPerfilId} 
        label={"Perfil"} 
        onChange={(id) => setTipoPerfilId(id)} 
        inputStyle={{ width: "450px" }} 
        dropdownStyle={{ width: "450px" }} 
        buttonStyle={{ left: "150px" } } 
        filtrarTodos={false}
        definePlaceholder={perfilAntesAlteracao}
      />
      <div className="d-flex w-100 justify-content-end">
        <button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => closeDialog(false)}>Cancelar</button>
        <button data-testid="botaoConfirmar" className="br-button primary" type="button" onClick={() => {
          salvarPerfil(usuarioId, tipoPerfilId)
        }}>Confirmar</button>
      </div>
    </Modal>
  );
}