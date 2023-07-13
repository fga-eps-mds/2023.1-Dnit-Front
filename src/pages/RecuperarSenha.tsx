import imgLateral from "../assets/imgLateral.png";
import Header from "../components/Header";
import RecoverPasswordForm from "../components/recuperarSenha/RecuperarSenha";
import "../styles/App.css";

function EsqueciSenha() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <RecoverPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default EsqueciSenha;