import logoDnit from "../../../assets/logoDnit.png";
import Header from "../../../components/Header";
import RegisterForm from "../../../components/acessosUsuario/CadastroUsuarioForm";
import "../../../styles/App.css";

function CadastrarUsuario() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="logoDnit" src={logoDnit} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default CadastrarUsuario;
