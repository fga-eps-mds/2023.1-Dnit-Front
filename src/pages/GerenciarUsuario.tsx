import { useState } from "react";
import TrilhaNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import FiltragemTabela from "../components/escolasCadastradas/FiltragemTabela";
import Footer from "../components/Footer";
import "../styles/App.css";
import Header from "../components/Cabecalho";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/Autenticacao";
import { Permissao } from "../models/auth";
import { useNavigate } from "react-router-dom";
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import { ButtonComponent } from "../components/Button";
import Table, { CustomTableRow } from "../components/Table/Table";
import ReactLoading from "react-loading";
import { EditarTipoPerfilDialog } from "../components/EditarTipoPerfilDialog";
import Select from "../components/Select";

interface EditarTipoPerfilArgs {
  id: string | null;
  readOnly: boolean;
}

interface FiltroNomeProps {
  onNomeChange: (nome: string) => void;
}

interface FiltroUFProps {
  onUFChange: (nome: string) => void;
}

interface FiltroPerfilProps {
  onPerfilChange: (nome: string) => void;
}

export function FiltroUF({ onUFChange }: FiltroUFProps) {
  const [UF, setUF] = useState('');
  const items = ['DF', 'AM', 'GO'];
  const [selectedValue, setSelectedValue] = useState<string>('');

  return ( 
    <Select items={items} value={selectedValue} label ={"UF:"} onChange={setSelectedValue}/>
  );
}

export function FiltroPerfil({ onPerfilChange }: FiltroPerfilProps) {
  const [Perfil, setPerfil] = useState('');

  const items = ['Administrador', 'Hardcoded', 'Teste'];
  const [selectedValue, setSelectedValue] = useState<string>('');

  return ( 
    <Select items={items} value={selectedValue} label ={"Perfil:"} onChange={setSelectedValue}/>
  );
}

export function FiltroNome({ onNomeChange }: FiltroNomeProps) {
  const [nome, setNome] = useState('');

  return (
    <div className="d-flex flex-column ml-3 mt-5 mb-5">
      <label className="ml-2" style={{ textAlign: 'start', fontSize: '16px' }}>Nome:</label>
      <div className="d-flex" style={{ fontSize: '16px' }}>
        <div className="br-input large input-button">
          <input className="br-input-search-large" type="search" placeholder="Nome" value={nome}
            onChange={e => setNome(e.target.value)}
            onKeyDown={e => e.key == 'Enter' && onNomeChange(nome)} />
          <button className="br-button" type="button" aria-label="Buscar" onClick={() => onNomeChange(nome)}>
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}




export default function GerenciarUsuario() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const loading = false;
  const [mostrarPerfil, setMostrarPerfil] = useState<EditarTipoPerfilArgs | null>(null);
  const [nome, setNome] = useState('');
  const [UF, setUF] = useState('');
  const [Perfil, setPerfil] = useState('');

  const navigate = useNavigate();
  // const { temPermissao } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!temPermissao(Permissao.UsuarioGerenciar)) {
  //     navigate("/");
  //   }
  // }, []);

  const listaUsuarios = [
    { id: 1, nome: 'Rafael', uf: 'DF', profileType: '123', email: '123' },
    { id: 2, nome: 'Fernando', uf: 'DF', profileType: '123', email: '123' },
    { id: 3, nome: 'Tiago', uf: 'GO', profileType: '123', email: '123' },
    { id: 4, nome: 'Yudi', uf: 'MG', profileType: '123', email: '123' },
    { id: 5, nome: 'Fernando', uf: 'DF', profileType: '123', email: '123' },
    { id: 6, nome: 'Tiago', uf: 'GO', profileType: '123', email: '123' },
    { id: 7, nome: 'Yudi', uf: 'MG', profileType: '123', email: '123' },
    { id: 8, nome: 'Fernando', uf: 'DF', profileType: '123', email: '123' },
    { id: 9, nome: 'Tiago', uf: 'GO', profileType: '123', email: '123' },
    { id: 10, nome: 'Yudi', uf: 'MG', profileType: '123', email: '123' },
    { id: 11, nome: 'Fernando', uf: 'DF', profileType: '123', email: '123' },
    { id: 12, nome: 'Tiago', uf: 'GO', profileType: '123', email: '123' },
    { id: 13, nome: 'Yudi', uf: 'MG', profileType: '123', email: '123' },
  ]


  return (
    <div className="App">
      {mostrarPerfil != null && <EditarTipoPerfilDialog id={mostrarPerfil.id} closeDialog={() => setMostrarPerfil(null)} />}
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} />
      <div className="d-flex flex-column m-5">
        <div className="d-flex justify-content-left align-items-center mr-5">
          <FiltroNome onNomeChange={setNome} />
          <FiltroUF onUFChange={setUF} />
          <FiltroPerfil onPerfilChange={setPerfil} />
        </div>
        {listaUsuarios.length == 0 && <Table columsTitle={['Nome', 'UF', 'Tipo de Perfil', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}

        <Table columsTitle={['Nome', 'UF', 'Tipo de Perfil', 'Email', '']} initialItemsPerPage={10} title="Perfis de usuário cadastrados">
          {
            listaUsuarios.map((p, index) =>
              <CustomTableRow key={`${p.id}-${index}`} id={index}
                data={{ '0': p.nome, '1': p.uf, '2': p.profileType, '3': p.email, ', ...': '' }}
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