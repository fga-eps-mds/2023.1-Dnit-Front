import logoDnit from "../assets/logoDnit.png";
import Header from "../components/Header";
import CadastroForm from "../components/form/FormularioCadastro";
import "../styles/App.css";

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
