import "../App.css";
import logoDnit from "../assets/logoDnit.png";
import CadastroForm from "../components/FormularioCadastro";
import Header from "../components/Header";

function Cadastro() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="logoDnit" src={logoDnit} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <CadastroForm />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
