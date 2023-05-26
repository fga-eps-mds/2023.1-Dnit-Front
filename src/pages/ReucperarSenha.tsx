import imgLateral from "../assets/imgLateral.png";
import Header from "../components/Header";
import RecuperarSenhaform from "../components/form/FormularioRecuperarSenha";
import "../styles/App.css";

function RecuperarSenha() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <RecuperarSenhaform/>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;