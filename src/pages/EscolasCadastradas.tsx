import Header from "../components/components-escolasCadastradas/Header";
import Footer from "../components/components-escolasCadastradas/Footer";
import "../styles/App.css";
import TabelaEscolas from "../components/components-escolasCadastradas/TabelaEscolas";



export default function EscolasCadastradas() {
  return (
    <div className="App">
      <Header />
      <TabelaEscolas />
      <Footer />
    </div>
  );
}

