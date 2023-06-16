import Header from "../components/components-escolasCadastradas/Header";
import Footer from "../components/components-escolasCadastradas/Footer";
import "../styles/App.css";
import TabelaEscolas from "../components/components-escolasCadastradas/TabelaEscolas";
import BreadCrumb from "../components/BreadCrumb";
import Inicial from "./Inicial";



export default function EscolasCadastradas() {
  const paginas = [
      {nome: "Inicio",link: "/home"},
      {nome: "Escolas Cadastradas",link: "/escolas-cadastradas"}
  ];
  return (
    <div className="App">
      <Header />
      <BreadCrumb paginaInicial={paginas[0]} elementosLi={paginas}></BreadCrumb>
      <TabelaEscolas />
      <Footer />
    </div>
  );
}

