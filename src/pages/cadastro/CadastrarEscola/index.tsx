import Header from "../../../components/Header";
import RegS from "../../../components/cadastrarEscolas/CadastrarEscola";
import { FiltroProvider } from "../../../context/FiltroTabela";
import "../../../styles/App.css";

function CadastrarEscola() {
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
    </div>
  );
}

export default CadastrarEscola;
