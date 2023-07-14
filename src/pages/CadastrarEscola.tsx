import Header from "../components/Cabecalho";
import RegS from "../components/cadastrarEscolas/CadastrarEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";

function RegisterSchool() {
  return (
    <div className="App">
      <Header dashboard />
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

export default RegisterSchool;
