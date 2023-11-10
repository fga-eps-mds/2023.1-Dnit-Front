import imgLateral from "../../assets/imgLateral.png";
import Header from "../../components/Header";
import LoginForm from "../../components/acessosUsuario/LoginForm";
import "../../styles/App.css";
import Footer from "../../components/Footer";

function Login() {
  return (
    <div className="App">
      <Header hasLogged={false} />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <LoginForm />
        </div>
      </div>
      <Footer home />
    </div>
  );
}

export default Login;
