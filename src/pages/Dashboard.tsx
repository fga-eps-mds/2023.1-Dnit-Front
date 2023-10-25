import {
  FileAddOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";
import IconGerenciarPerfis from "../assets/icones/GerenciarPerfis.svg";
import { Card, Collapse, CollapseProps } from "antd";
import { useNavigate } from "react-router";
import Header from "../components/Cabecalho";
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import Footer from "../components/Footer";
import "../styles/App.css";
import "../styles/Dashboard.css";
import "../components/Collapse/index";
import "../components/Collapse/index";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/Autenticacao";
import { Permissao } from "../models/auth";
import fetchPermissoesDoUsuario from "../service/listarPermissoesUsuario";

export default function Dashboard() {
  const navigate = useNavigate();
  const paginas = [{ nome: "Logout", link: "/login" }];

  const { temPermissao, setPermissoes } = useContext(AuthContext);

  const [podeVisualizarEscola, setPodeVisualizarEscola] = useState(
    temPermissao(Permissao.EscolaVisualizar)
  );
  const [podeVisualizarUps, setPodeVisualizarUps] = useState(
    temPermissao(Permissao.UpsVisualizar)
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

  useEffect(() => {
    fetchPermissoesDoUsuario().then((permissoes) => {
      setPermissoes(permissoes);

      setPodeVisualizarEscola(temPermissao(Permissao.EscolaVisualizar));
      setPodeVisualizarUps(temPermissao(Permissao.UpsVisualizar));
      setPodeCadastrarEscola(temPermissao(Permissao.EscolaCadastrar));
      setPodeCadastrarSinistro(temPermissao(Permissao.SinistroCadastrar));
      setPodeCadastrarRodovias(temPermissao(Permissao.RodoviaCadastrar));
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
              <p className="text">Visualizar Escolas</p>
            </Card>
          )}
          {podeVisualizarUps && (
            <Card className="card" onClick={() => navigate("/telaUPS")}>
              <FileTextOutlined className="icon" />
              <p className="text">Visualizar Dados UPS</p>
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
          <Card className="disabled">
            <FileTextOutlined className="icon" />
            <p className="text">Cadastrar empresas</p>
          </Card>
          <Card className="card" onClick={() => navigate("/gerenciarPerfis")}>
            <img
              className="iconPerfis"
              src={IconGerenciarPerfis}
              alt="ícone gerenciar perfis"
            />
            <p className="text">Gerenciar Perfis</p>
          </Card>
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
