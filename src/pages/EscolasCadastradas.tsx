import TrilhaNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import FiltragemTabela from "../components/escolasCadastradas/FiltragemTabela";
import Footer from "../components/Footer";
import TabelaEscola from "../components/escolasCadastradas/TabelaEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";
import Header from "../components/Cabecalho";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao
        elementosLi={paginas}
        escolasCadastradas
      ></TrilhaNavegacao>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
