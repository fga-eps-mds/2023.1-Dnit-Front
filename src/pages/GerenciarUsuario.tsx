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
import fetchUnidadeFederativa from "../service/unidadesFederativas";

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

interface FilterOptions {
  id: number;
  rotulo: string;
}


interface FiltroPerfilProps {
  perfil?: number;
  onPerfilChange: (id: number) => void;
}


export function FiltroPerfil({ onPerfilChange, perfil }: FiltroPerfilProps) {
  const items = [{ id: 0, rotulo: 'Todos' }, { id: 1, rotulo: 'Administrador' }, { id: 2, rotulo: 'Basico' }, { id: 3, rotulo: 'Customizado' }];
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
  const [listaUfs, setListaUfs] = useState<FilterOptions[]>([]);

  const navigate = useNavigate();


  const buscarUsuarios = () => {
    setLoading(true);

    fetchUsuarios<ListaPaginada>({pagina:1, itemsPorPagina:tamanhoPagina, nome:nome, ufLotacao:uf, perfilId:perfil})
      .then(lista => {
        // setBackupListaUsuarios(lista.items)
        setListaUsuarios(lista.items)
      })
      .catch(error => notificationApi.error({ message: 'Falha na listagem de usuários. ' + (error?.response?.data || '') }))
      .finally(() => setLoading(false));
  }

  //retirado de: ../components/acessosUsuario/CadastrarUsuario.tsx
  async function fetchUf(): Promise<void> {
    const listaUfs = await fetchUnidadeFederativa();
    const novaUf = listaUfs.map((u) => ({ id: u.id, rotulo: u.sigla }));
    setListaUfs(novaUf);
  }

  useEffect(() => {
    buscarUsuarios();
  }, [nome, uf, perfil]);

  useEffect(() => {
    fetchUf();

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
          <Select items={listaUfs} value={uf} label={"UF:"} onChange={setUF} dropdownStyle={{ marginLeft: "20px", width: "260px" }} />
          {/* <FiltroUF onUFChange={setUF} uf={uf} ufsLista={listaUfs}/> */}
          {/* <FiltroPerfil onPerfilChange={setPerfil} perfil={perfil} /> */}
        </div>
        {listaUsuarios.length == 0 && <Table columsTitle={['Nome', 'Tipo de Perfil', 'UF', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}

        <Table columsTitle={['Nome', 'Tipo de Perfil', 'UF', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados">
          {
            listaUsuarios.map((p, index) =>
            (<CustomTableRow key={`${p.id}-${index}`} id={index}
              data={{ '0': p.nome, '1': p.perfilId, '2': `${listaUfs.find((uf) => uf.id === p.ufLotacao)?.rotulo}`, '3': p.email, ', ...': '' }}
              onEditRow={() => setMostrarPerfil({ id: null, readOnly: true })}
              hideTrashIcon={true}
              hideEyeIcon={true}
            />
            ))
          }
        </Table>
        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  );
}