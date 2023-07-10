import {
  FileAddOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Card, Collapse, CollapseProps } from "antd";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/components-escolasCadastradas/Footer";
import "../styles/App.css";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Visualizações",
      children: (
        <div className="collapse-item">
          <Card
            className="card"
            onClick={() => navigate("/escolas-cadastradas")}
          >
            <FileTextOutlined className="icon" />
            <p className="text">Visualizar Escolas</p>
          </Card>
          <Card className="card" onClick={() => navigate("/telaUPS")}>
            <FileTextOutlined className="icon" />
            <p className="text">Visualizar Dados UPS</p>
          </Card>
        </div>
      ),
    },
    {
      key: "2",
      label: "Adição de dados",
      children: (
        <div className="collapse-item">
          <Card className="card" onClick={() => navigate("/cadastrarescola")}>
            <FormOutlined className="icon" />
            <p className="text">Cadastrar Escolas</p>
          </Card>
          <Card
            className="card"
            onClick={() => navigate("/cadastrarsinistros")}
          >
            <FileAddOutlined className="icon" />
            <p className="text">Adicionar Sinistros</p>
          </Card>
          <Card className="card" onClick={() => navigate("/cadastrarRodovias")}>
            <FileAddOutlined className="icon" />
            <p className="text">Adicionar Rodovias</p>
          </Card>
        </div>
      ),
    },
    {
      key: "3",
      label: "Ferramentas Administrativas",
      children: (
        <Card className="disabled">
          <FileTextOutlined className="icon" />
          <p className="text">Cadastrar empresas</p>
        </Card>
      ),
    },
  ];
  return (
    <div className="App">
      <Header dashboard />
      <Collapse
        defaultActiveKey={["1", "2"]}
        ghost
        items={items}
        className="collapse"
      />
      <Footer />
    </div>
  );
}
