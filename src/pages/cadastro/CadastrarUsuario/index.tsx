import logoDnit from "../../../assets/logoDnit.png";
import Header from "../../../components/Header";
import RegisterForm from "../../../components/acessosUsuario/CadastroUsuarioForm";
import "../../../styles/App.css";
import Footer from "../../../components/Footer";

function CadastrarUsuario() {
  return (
    <div className="App">
      <Header title="Início" subtitle="Cadastro" hasLogged={false} />
      <div className="Secao">
        <div className="Lateral">
          <img className="logoDnit" src={logoDnit} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <RegisterForm />
        </div>
      </div>
      <Footer home />
    </div>
  );
}

export default CadastrarUsuario;
