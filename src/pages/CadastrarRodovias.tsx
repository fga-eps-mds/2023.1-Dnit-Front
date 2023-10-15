import Header from "../components/Cabecalho";
import RegistrarRodovias from "../components/cadastrarRodovias/CadastrarRodovias";
import Footer from "../components/Rodape";
import "../styles/App.css";

function CadastrarRodovias() {
  return (
    <div className="App">
      <Header />
      <div className="Secao2">
        <RegistrarRodovias />
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarRodovias;
