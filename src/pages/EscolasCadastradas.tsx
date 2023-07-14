import BreadCrumb from "../components/escolasCadastradas/TrilhaNavegacao";
import FiltragemTabela from "../components/escolasCadastradas/FiltragemTabela";
import Footer from "../components/Rodape";
import Header from "../components/escolasCadastradas/HeaderListaEscolas";
import TabelaEscola from "../components/escolasCadastradas/TabelaEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];
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
