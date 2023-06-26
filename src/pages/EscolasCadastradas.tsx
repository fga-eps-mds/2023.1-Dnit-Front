import Header from "../components/components-escolasCadastradas/Header";
import Footer from "../components/components-escolasCadastradas/Footer";
import "../styles/App.css";
import BreadCrumb from "../components/BreadCrumb";
//import Inicial from "./Inicial";
import FiltragemTabela from "../components/components-escolasCadastradas/FiltragemTabela";
import TabelaEscola from "../components/components-escolasCadastradas/TabelaEscola";
import { FiltroProvider } from "../context/FiltroTabela";




export default function EscolasCadastradas() {

  const paginas = [
    { nome: "Inicio", link: "/home" },
    { nome: "Escolas Cadastradas", link: "/escolas-cadastradas" }
  ];
  return (
    <div className="App">
      <Header />
      <BreadCrumb paginaInicial={paginas[0]} elementosLi={paginas}></BreadCrumb>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}

