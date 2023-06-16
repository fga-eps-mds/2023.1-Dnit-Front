import imgLateral from "../assets/imgLateral.png";
import Header from "../components/Header";
import EsqueciSenhaForm from "../components/form/RecoverPassword";
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
          <EsqueciSenhaForm />
        </div>
      </div>
    </div>
  );
}

export default EsqueciSenha;