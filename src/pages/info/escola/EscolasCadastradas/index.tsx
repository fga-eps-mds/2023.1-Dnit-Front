import TrilhaNavegacao from "../../../../components/escolasCadastradas/Navegacao";
import FiltragemTabela from "../../../../components/escolasCadastradas/Tabela/Filtro";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/escolasCadastradas/CabecalhoLista";
import TabelaEscola from "../../../../components/escolasCadastradas/Tabela/Tabela";
import { FiltroProvider } from "../../../../context/FiltroTabela";
import "../../../../styles/App.css";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao elementosLi={paginas} escolasCadastradas></TrilhaNavegacao>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
