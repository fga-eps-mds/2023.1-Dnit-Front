import Footer from "../components/Footer";
import "../styles/App.css";
import Header from "../components/Cabecalho";
import { useState, useContext, useEffect } from "react";
import { Permissao, TipoPerfil } from "../models/auth";
import { useNavigate } from "react-router-dom";
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import { ButtonComponent } from "../components/Button";
import Table, { CustomTableRow } from "../components/Table/Table";
import ReactLoading from "react-loading";
import { EditarTipoPerfilDialog } from "../components/EditarTipoPerfilDialog";
import Select from "../components/Select";
import { profile } from "console";
import fetchUsuarios from "../service/listarUsuarios";
import { notification } from "antd";
import { UsuarioModel } from "../models/usuario";

interface EditarTipoPerfilArgs {
  id: string | null;
  readOnly: boolean;
}

interface ListaPaginada {
  pagina: number;
  itemsPorPagina: number;
  total: number;
  totalPaginas: number;
  items: UsuarioModel[];
}

interface FiltroNomeProps {
  nome?: string;
  onNomeChange: (nome: string) => void;
}

interface FiltroUFProps {
  uf?: number;
  onUFChange: (id: number) => void;
}

interface FiltroPerfilProps {
  perfil?: number;
  onPerfilChange: (id: number) => void;
}

export function FiltroUF({ onUFChange, uf}: FiltroUFProps) {
  const items = [{id: 0, rotulo: 'Todos'},{id: 1, rotulo: 'DF'}, {id: 2, rotulo: 'MG'}, {id: 3, rotulo: 'GO'}];

  return (                                                             
    <Select items={items} value={uf} label={"UF:"} onChange={onUFChange} dropdownStyle={{ marginLeft: "20px", width: "260px" }} />
    );
    
}

export function FiltroPerfil({ onPerfilChange, perfil}: FiltroPerfilProps) {
  const items = [{id: 0, rotulo: 'Todos'},{id: 1, rotulo: 'Administrador'}, {id: 2, rotulo: 'Basico'}, {id: 3, rotulo: 'Customizado'}];
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <Select items={items} value={perfil} label={"Perfil:"} onChange={onPerfilChange} dropdownStyle={{ marginLeft: "20px", width: "260px" }} />
  );
}

export function FiltroNome({ onNomeChange, nome }: FiltroNomeProps) {
  return (
    <div className="d-flex flex-column ml-3 mt-5 mb-5">
      <label className="ml-2" style={{ textAlign: 'start', fontSize: '16px' }}>Nome:</label>
      <div className="d-flex" style={{ fontSize: '16px' }}>
        <div className="br-input large input-button">
          <input className="br-input-search-large" type="search" placeholder="Nome" value={nome}
            onChange={e => onNomeChange(e.target.value)}
          // onKeyDown={e => e.key == 'Enter' && onNomeChange(nome!)} 
          />
          <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}




export default function GerenciarUsuario() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState<EditarTipoPerfilArgs | null>(null);
  const [nome, setNome] = useState('');
  const [uf, setUF] = useState(0);
  const [perfil, setPerfil] = useState(''); //Tipo do perfil (Administrador, Supervisor tecnico)
  const [listaUsuarios, setListaUsuarios] = useState<UsuarioModel[]>([]);
  const [backupListaUsuarios, setBackupListaUsuarios] = useState<UsuarioModel[]>([]);
  const [notificationApi, notificationContextHandler] = notification.useNotification();
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  const navigate = useNavigate();
  // const { temPermissao } = useContext(AuthContext);


  const buscarUsuarios = () => {
    setLoading(true);

    fetchUsuarios<ListaPaginada>(1, tamanhoPagina, nome, uf, perfil)
      .then(lista => {
        // setBackupListaUsuarios(lista.items)
        if(lista.items.length > 0)
          setListaUsuarios(lista.items)
        //setTotal
      console.log(lista.items);
      })
      .catch(error => notificationApi.error({ message: 'Falha na listagem de usuários. ' + (error?.response?.data || '') }))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    buscarUsuarios();
  }, [nome, uf, perfil]);

  useEffect(() => {
    setBackupListaUsuarios([
    ]);

    setListaUsuarios(backupListaUsuarios);
  }, []);

  // useEffect(() => {
  //   if (!temPermissao(Permissao.PerfilVisualizar)) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="App">
      {mostrarPerfil != null && <EditarTipoPerfilDialog id={mostrarPerfil.id} closeDialog={() => setMostrarPerfil(null)} />}
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} />
      <div className="d-flex flex-column m-5">
        <div className="d-flex justify-content-left align-items-center mr-5">
          <FiltroNome onNomeChange={setNome} />
          <FiltroUF onUFChange={setUF} uf={uf}/>
          {/* <FiltroPerfil onPerfilChange={setPerfil} perfil={perfil} /> */}
        </div>
        {listaUsuarios.length == 0 && <Table columsTitle={['Nome', 'UF', 'Tipo de Perfil', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}

        <Table columsTitle={['Nome', 'UF', 'Tipo de Perfil', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados">
          {
            listaUsuarios.map((p, index) =>
              <CustomTableRow key={`${p.id}-${index}`} id={index}
                data={{ '0': p.nome, '1': `${p.ufLotação}`, '2': "p.perfil.nome", '3': p.email, ', ...': '' }}
                onEditRow={() => setMostrarPerfil({ id: null, readOnly: true })}
                hideTrashIcon={true}
                hideEyeIcon={true}
              />
            )
          }
        </Table>
        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  );
}