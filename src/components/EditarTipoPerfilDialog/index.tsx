import { useEffect, useState } from "react";
import { notification } from "antd";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import Select from "../Select";
import "./styles.css";
import {fetchAtualizaTipoPerfil} from "../../service/usuarioApi";
import { UsuarioModel } from "../../models/usuario";
import { fetchMunicipio } from "../../service/escolaApi";
import fetchAtualizarTipoPerfil from "../../service/atualizarTipoPerfil";


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
  listaOpcoesUfs: FilterOptions[];
  listaUsuarios: UsuarioModel[];
  perfilAntesAlteracao: string;
  ufAntesAlteracao: string;
  municipioAntesAlteracao: string;
  usuarioId: string;
  closeDialog: (edicao: boolean) => void;
  atualizaTabela: (atualizou: UsuarioModel[] ) => void;
}



export function EditarTipoPerfilDialog({ closeDialog, listaOpcoes, listaOpcoesUfs, usuarioId, listaUsuarios, atualizaTabela, perfilAntesAlteracao, ufAntesAlteracao, municipioAntesAlteracao }: EditarTipoPerfilDialogProps) {
  const [loading, setLoading] = useState(false);
  const [tipoPerfilId, setTipoPerfilId] = useState('');
  const [newUF, setNewUF] = useState(ufAntesAlteracao);
  const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
  const [newMunicipio, setNewMunicipio] = useState(municipioAntesAlteracao);
  const [notificationApi, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const salvarPerfil = (usuarioId: string, perfilId: string) => {
    if (!tipoPerfilId.trim()) {
      notification.error({ message: 'Selecione um tipo de perfil' });
      return;
    }
    setLoading(true);

    fetchAtualizarTipoPerfil(usuarioId, perfilId, Number(newUF), Number(newMunicipio))
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

  function procuraRotuloMunicipio(idMunicipio: string){
    return listaMunicipios.find((municipio) => municipio.id === idMunicipio)?.rotulo;
  }

  function procuraRotuloUf(idUF: string) {
    return listaOpcoesUfs.find((uf) => uf.id === '' + idUF)?.rotulo;
  }

  async function fetchMunicipios(): Promise<void> {
    const listaMunicipios = await fetchMunicipio(Number(newUF));
    const novoMunicipio = listaMunicipios.map((u) => ({ id:''+ u.id, rotulo: u.nome }));
    setListaMunicipios(novoMunicipio);
  }

  function atualizarListagemUsuarios() {
    const listaUsuariosAtualizada = listaUsuarios.map((usuario) => {
      if(usuario.id === usuarioId) return { ...usuario,  perfilId: tipoPerfilId, ufLotacao: Number(newUF), municipio: {nome:`${procuraRotuloMunicipio(newMunicipio)}`, id: Number(newMunicipio)}}
      return usuario;
    });

    atualizaTabela(listaUsuariosAtualizada);
     
  }

  useEffect(() => {
    fetchMunicipios();
  }, [newUF]);


  if (loading) {
    
    return (
      <Modal className="modal-title" closeModal={() => closeDialog(false)}>
        <h4 className="text-center mt-2">Carregando Edição de Perfil... </h4>
        <div className="d-flex justify-content-center m-4">
          <ReactLoading type="spinningBubbles" color="#000000" />
        </div>
      </Modal>
      
    );
  }

  return (
    <Modal className="modal-title " closeModal={() => closeDialog(false)}>
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
      <Select 
        items={listaOpcoesUfs} 
        value={newUF} 
        label={"UF"} 
        onChange={(uf) => {
          setNewUF(uf)}} 
        inputStyle={{ width: "450px" }} 
        dropdownStyle={{ width: "450px" }} 
        buttonStyle={{ left: "150px" } } 
        filtrarTodos={false}
        definePlaceholder={`${procuraRotuloUf(ufAntesAlteracao)}`}
      />
      <Select 
        items={listaMunicipios} 
        value={newMunicipio} 
        label={"Municipio"} 
        onChange={(municipio) => {
          setNewMunicipio(municipio)}} 
        inputStyle={{ width: "450px" }} 
        dropdownStyle={{ width: "450px" }} 
        buttonStyle={{ left: "150px" } } 
        filtrarTodos={false}
        definePlaceholder={`${procuraRotuloMunicipio(municipioAntesAlteracao)}`}
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