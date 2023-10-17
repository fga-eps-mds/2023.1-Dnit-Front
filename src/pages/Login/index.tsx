import imgLateral from "../../assets/imgLateral.png";
import Header from "../../components/Header";
import LoginForm from "../../components/acessosUsuario/LoginForm";
import "../../styles/App.css";

function Login() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
