import TrilhaNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import Footer from "../components/Rodape";
import Header from "../components/escolasCadastradas/CabecalhoListaEscolas";
import "../styles/App.css";
import Modal from "../components/Modal";
import { ChangeEvent, ReactInstance, useContext, useEffect, useState } from "react";
import Collapse from "../components/Collapse";
import Tabela from "../components/Table/Table";
import fetchPermissoesCategoria from "../service/listarPermissoesCategoria"
import fetchTabelaPerfis from "../service/ListarTabelaPerfis"
import { Permissao, PermissaoCategoria, PermissaoModel, PerfisTabela } from "../models/auth"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/Autenticacao";
import { CollapseOpcao } from "../components/Collapse";
import fetchCadastroPerfil from "../service/criarPerfil";
import fetchExcluirPerfil from "../service/excluiPerfil";
import { PerfilDto } from "../models/perfil";

interface PermissaoPerfil {
  permissao: Permissao,
  ativa: boolean;
}

interface PerfilData {
  nome: string;
  permissoes: PermissaoPerfil[];
};

export default function GerenciarPerfis() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [isVisible, setIsVisible] = useState(false);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [permissoes, setPermissoes] = useState<PermissaoCategoria[] | null>(null);
  const [novoPerfil, setNovoPerfil] = useState<PerfilData>({nome: "", permissoes: []});
  const [nomePerfil, setNomePerfil] = useState<string>("");
  const [perfilPermissoes, setPerfilPermissoes] = useState<Permissao[]>([]);
  const [paginaAtual, setpaginaAtual] = useState(1);
  const [perfisPorPagina, setPerfisPorPagina] = useState(10); 
  const [tabelaPermissoes, setTabelaPermissoes] = useState<PerfisTabela[]>();
  const [carregando, setCarregando] = useState(false);
  const [linhaDelete, setLinhaDelete] = useState(-1);

  const navigate = useNavigate();
  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.PerfilVisualizar)) {
      navigate("/");
    }

    if(tabelaPermissoes && linhaDelete!=-1){
      console.log(tabelaPermissoes[linhaDelete].id);
      fetchExcluirPerfil(tabelaPermissoes[linhaDelete].id);
    }
    
    fetchTabelaPerfis({paginaAtual, perfisPorPagina}).then(data => {
      setTabelaPermissoes(data);
      console.log(data);
    });
    fetchPermissoesCategoria().then(data => {
      setPermissoes(data)
      setNovoPerfil({nome: "", permissoes: data.flatMap(p => p.permissoes.map(pp => {return {permissao: pp.codigo, ativa: false}}))});
    });
  }, [linhaDelete]);

  const handleNomeFiltro = (event: ChangeEvent<HTMLInputElement>) => {
    setNomeFiltro((event.target.value))
  };

  const FiltroPerfis = () => {
    return (<div className="br-input medium input-button"
      style={{
        maxWidth: "300px",
        marginLeft: "70px",
        textAlign: "initial",
      }}>
      <label htmlFor="input-search-medium">Nome</label>
      <input
        id="input-search-medium"
        type="search"
        value={nomeFiltro}
        onChange={handleNomeFiltro}
        placeholder="Nome"
      />
      <button
        className="br-button"
        type="button"
        aria-label="Buscar"
        data-testid="buscar-nome"
      >
        <i className="fas fa-search" aria-hidden="true"></i>
      </button>
    </div>)
  };

  const atualizarPerfilPermissoes = (categoria: string, estados: boolean[]) => {
    localStorage.setItem(`perfil-${categoria}`, estados.join(','));
  }
 
  const CollapsePerfis = () => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}>
        {permissoes?.map(pp => <Collapse
          titulo={pp.categoria}
          opcoes={pp.permissoes.map(p => { return { id: p.codigo, nome: p.descricao } })}
          onSelectionChange={(titulo, estados) => atualizarPerfilPermissoes(titulo, estados)}
          />)}
      </div>
    )
  }

  const criarPerfil = () => {
    const perfilPermissoes = [""]
    // permissoes?.flatMap(pp => {
    //   const ps = localStorage.getItem(`perfil-${pp.categoria}`)?.split(',');
    //   return pp.permissoes.map((perm, index) => [perm, ps != null && ps[index] == "true"]).filter(([_, ativa]) => ativa).map(([perm, _]) => (perm as PermissaoModel)?.codigo);
    // })
    setCarregando(true);
    fetchCadastroPerfil({
      nome: nomePerfil,
      permissoes: perfilPermissoes
    } as PerfilDto)
      .then(perfil => setTabelaPermissoes(t => [...(t ?? []), perfil]))
      .finally(() => {
        setCarregando(false);
        setIsVisible(false);
      });
  };
  // const te:  = [{'Tipo de perfil': 'alo', 'Permissões': ['Cadastrar']}];
  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao elementosLi={paginas} registrarPerfis mostrarModal={setIsVisible}></TrilhaNavegacao>
      {isVisible &&
        <Modal
          setNomePerfil={setNomePerfil}
          isOpen={isVisible}
          children={permissoes && <CollapsePerfis />}
          button1Text="Cancelar"
          button2Text="Salvar"
          mostrarConfirmacao={!carregando}
          confirmAction={() => criarPerfil()}
          closeModal={() => { setIsVisible(false) }} />
      }
      <FiltroPerfis />
      {tabelaPermissoes && <Tabela 
        title="Perfis de usuário cadastrados"
        // data={[{'Tipo de perfil': 'alo', 'Permissões': 'Cadastrar'}]}
        data={tabelaPermissoes.map(p => {return {
          'Tipo de perfil': p.nome,
          'Número de Usuários': p.quantidadeUsuarios.toString(),
          'Permissões': p.permissoes.splice(0, 10).map(pp => pp.descricao).join(', ') + (p.permissoes.length >= 10 ? ' ...' : ''),
        }})}
        initialItemsPerPage={10}
        onDeleteRow={setLinhaDelete} /> }
      <Footer />
    </div>
  );
}

// [{'Tipo de perfil': 'alo', 'Número de Usuários': '100', 'Permissões': ['Cadastrar']}]
//Tipo de perfil Número de Usuários Permissões