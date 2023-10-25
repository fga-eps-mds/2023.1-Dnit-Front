import { useEffect, useState } from "react";
import Header from "../components/Cabecalho"
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import PerfilDialog from "../components/PerfilDialog";
import { PerfisTabela, TipoPerfil } from "../models/auth";
import Footer from "../components/Footer";
import Table, { CustomTableRow } from "../components/Table/Table";
import ReactLoading from "react-loading";
import { notification } from "antd";
import fetchPerfis from "../service/listarPerfis";
import { DeletarPerfilArgs, DeletarPerfilDialog } from "../components/DeletarPerfilDialog";


interface PerfilDialogArgs {
  id: string | null;
  readOnly: boolean;
}

interface NomeFilterProps {
  onNomeChange: (nome: string) => void;
}

export function NomeFilter({onNomeChange}: NomeFilterProps) {
  const [nome, setNome] = useState('');

  return (
    <div className="d-flex flex-column ml-3 mt-5 mb-5">
      <label className="ml-2" style={{textAlign: 'start', fontSize: '16px'}}>Nome:</label>
      <div className="d-flex" style={{fontSize: '16px'}}>
        <input className="br-input" type="search" placeholder="Nome" value={nome}
          onChange={e => setNome(e.target.value)}
          onKeyDown={e => e.key == 'Enter' && onNomeChange(nome)}/>
      </div>
    </div>
  );
}

export default function GerenciarPerfis() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [showPerfil, setShowPerfil] = useState<PerfilDialogArgs | null>(null);
  const [showDeletarPerfil, setDeletarPerfil] = useState<DeletarPerfilArgs | null>(null);
  const [perfis, setPerfis] = useState<PerfisTabela[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationApi, notificationContextHandler] = notification.useNotification();
  const tamanhoPagina = 500;
  const [nome, setNome] = useState('');

  const onPerfilChange = (perfil: PerfisTabela | null) => {
    if (!perfil) {
      return;
    }

    buscarPerfis();
  }

  const buscarPerfis = () => {
    setLoading(true);

    fetchPerfis(1, tamanhoPagina, nome)
      .then(perfis => setPerfis(perfis))
      .catch(error => notificationApi.error({ message: 'Falha na listagem de perfis. ' + (error?.response?.data || '') }))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    buscarPerfis();
  }, [nome]);


  return (
    <div className="App">
      {notificationContextHandler}
      {showPerfil != null && <PerfilDialog id={showPerfil.id} readOnly={showPerfil.readOnly} closeDialog={(perfil) => { setShowPerfil(null); onPerfilChange(perfil) }} />}
      {showDeletarPerfil != null && <DeletarPerfilDialog perfil={showDeletarPerfil} onClose={(deletou) => { setDeletarPerfil(null); deletou && buscarPerfis() }} />}
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} registrarPerfis mostrarModal={() => setShowPerfil({ id: null, readOnly: false })}></TrilhaDeNavegacao>
      <div className="d-flex flex-column m-5">
        <NomeFilter onNomeChange={setNome}/>

        {perfis.length == 0 && <Table columsTitle={['Nome', 'Número de Usuários', 'Permissões']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}

        <Table columsTitle={['Nome', 'Número de Usuários', 'Permissões']} initialItemsPerPage={10} title="Perfis de usuário cadastrados">
          {
            perfis.map((p, index) =>
              <CustomTableRow key={`${p.id}-${index}`} id={index}
                data={{ '0': p.nome, '1': `${p.quantidadeUsuarios}`, '2': p.permissoes.map(pp => pp.descricao).splice(0, 3).join(', ') + (p.permissoes.length > 3 ? ', ...' : '') }}
                onDeleteRow={() => setDeletarPerfil({ id: p.id, nome: p.nome, quantidade: p.quantidadeUsuarios})}
                onEditRow={() => setShowPerfil({ id: p.id, readOnly: false })}
                onDetailRow={() => setShowPerfil({ id: p.id, readOnly: true })}
                hideEditIcon={p.tipo == TipoPerfil.Administrador}
                hideTrashIcon={p.tipo != TipoPerfil.Customizavel} />
            )
          }
        </Table>
        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  )
}
