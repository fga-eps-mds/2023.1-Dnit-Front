import {
  FileAddOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";
import IconGerenciarPerfis from "../../../assets/icones/GerenciarPerfis.svg";
import IconGerenciarUsuarios from "../../../assets/icones/GerenciarUsuarios.svg";
import { Card, Collapse, CollapseProps } from "antd";
import { useNavigate } from "react-router";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import Footer from "../../../components/Footer";
import "../../../styles/App.css";
import "./styles.css";
import "../../../components/Collapse/";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/Autenticacao";
import { Permissao } from "../../../models/auth";
import {fetchPermissoesDoUsuario} from "../../../service/usuarioApi";

export default function Dashboard() {
  const navigate = useNavigate();
  const paginas = [{ nome: "Logout", link: "/login" }];

  const { temPermissao, setPermissoes } = useContext(AuthContext);

  const [podeVisualizarEscola, setPodeVisualizarEscola] = useState(
    temPermissao(Permissao.EscolaVisualizar)
  );
  const [podeVisualizarRanque, setPodeVisualizarRanque] = useState(
    temPermissao(Permissao.RanqueVisualizar)
  );
  const [podeCadastrarEscola, setPodeCadastrarEscola] = useState(
    temPermissao(Permissao.EscolaCadastrar)
  );
  const [podeCadastrarSinistro, setPodeCadastrarSinistro] = useState(
    temPermissao(Permissao.SinistroCadastrar)
  );
  const [podeCadastrarRodovias, setPodeCadastrarRodovias] = useState(
    temPermissao(Permissao.RodoviaCadastrar)
  );
  const [podeGerenciarPerfis, setPodeGerenciarPerfis] = useState(
    temPermissao(Permissao.PerfilVisualizar)
  );
  const [podeCadastrarEmpresa, setPodeCadastrarEmpresa] = useState(
    temPermissao(Permissao.EmpresaCadastrar)
  );
  const [podeGerenciarUsuario, setPodeGerenciarUsuario] = useState(
    temPermissao(Permissao.UsuarioVisualizar)
  );

  useEffect(() => {
    fetchPermissoesDoUsuario().then((permissoes) => {
      setPermissoes(permissoes);

      setPodeVisualizarEscola(temPermissao(Permissao.EscolaVisualizar));
      setPodeVisualizarRanque(temPermissao(Permissao.RanqueVisualizar));
      setPodeCadastrarEscola(temPermissao(Permissao.EscolaCadastrar));
      setPodeCadastrarSinistro(temPermissao(Permissao.SinistroCadastrar));
      setPodeCadastrarRodovias(temPermissao(Permissao.RodoviaCadastrar));
      setPodeGerenciarUsuario(temPermissao(Permissao.UsuarioVisualizar));
      setPodeGerenciarPerfis(temPermissao(Permissao.PerfilVisualizar));
      setPodeCadastrarEmpresa(temPermissao(Permissao.EmpresaCadastrar));
    });
  }, []);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Visualizações",
      children: (
        <div className="collapse-item">
          {podeVisualizarEscola && (
            <Card
              className="card"
              onClick={() => navigate("/escolas-cadastradas")}
            >
              <FileTextOutlined className="icon" />
              <p data-testid='visualizar-escola-option' className="text">Visualizar Escolas</p>
            </Card>
          )}
          {podeVisualizarRanque && (
            <Card className="card" onClick={() => navigate("/ranque")}>
              <FileTextOutlined className="icon" />
              <p className="text">Ranking de escolas</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Adição de dados",
      children: (
        <div className="collapse-item">
          {podeCadastrarEscola && (
            <Card className="card" onClick={() => navigate("/cadastrarescola")}>
              <FormOutlined className="icon" />
              <p className="text">Cadastrar Escolas</p>
            </Card>
          )}
          {podeCadastrarSinistro && (
            <Card
              className="card"
              onClick={() => navigate("/cadastrarsinistros")}
            >
              <FileAddOutlined className="icon" />
              <p className="text">Adicionar Sinistros</p>
            </Card>
          )}
          {podeCadastrarRodovias && (
            <Card
              className="card"
              onClick={() => navigate("/cadastrarRodovias")}
            >
              <FileAddOutlined className="icon" />
              <p className="text">Adicionar Rodovias</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Ferramentas Administrativas",
      children: (
        <div className="collapse-item">
          {podeCadastrarEmpresa && (
            <Card className="disabled">
              <FileTextOutlined className="icon" />
              <p className="text">Cadastrar empresas</p>
            </Card>
          )}
          {podeGerenciarUsuario &&
            <Card className="card" onClick={() => navigate("/gerenciarUsuario")}>
              <img
                className="iconGenciaUsuarios"
                src={IconGerenciarUsuarios}
                alt="ícone gerenciar usuarios"
              />
              <p className="text">Gerenciar Usuário</p>
            </Card>}
          {podeGerenciarPerfis && (
            <Card className="card" onClick={() => navigate("/gerenciarPerfis")}>
              <img
                className="iconPerfis"
                src={IconGerenciarPerfis}
                alt="ícone gerenciar perfis"
              />
              <p className="text">Gerenciar Perfis</p>
            </Card>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="App">
      <Header />
      <div className="Main-content">
        <TrilhaDeNavegacao elementosLi={paginas} />
        <Collapse
          defaultActiveKey={["1", "2", "3"]}
          ghost
          items={items}
          className="collapse"
        />
      </div>
      <Footer />
    </div>
  );
}
