import BreadCrumb from "../components/BreadCrumb";
import FiltragemTabela from "../components/components-escolasCadastradas/FiltragemTabela";
import Footer from "../components/components-escolasCadastradas/Footer";
import Header from "../components/components-escolasCadastradas/Header";
import TabelaEscola from "../components/components-escolasCadastradas/TabelaEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";

export default function EscolasCadastradas() {
  const paginas = [
    { nome: "Escolas Cadastradas", link: "/escolas-cadastradas" },
    { nome: "Logout", link: "/login" },
  ];
  return (
    <div className="App">
      <Header />
      <BreadCrumb elementosLi={paginas}></BreadCrumb>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
