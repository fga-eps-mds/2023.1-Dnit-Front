import logoDnit from "../../assets/logoDnit.png";
import Header from "../../components/Cabecalho";
import RegisterForm from "../../components/acessosUsuario/CadastrarUsuario";
import "../../styles/App.css";

function Register() {
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

export default Register;
