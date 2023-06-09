import Header from "../components/Header";
import RegS from "../components/form/RegisterEscola";
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
