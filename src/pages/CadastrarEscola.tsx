import Header from "../components/Cabecalho";
import Footer from "../components/Footer";
import RegS from "../components/cadastrarEscolas/CadastrarEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";

function RegisterSchool() {
  return (
    <div className="App">
      <Header />
      <div className="Secao2">
        <div className="box">
          <FiltroProvider>
            <RegS />
          </FiltroProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterSchool;
