import imgLateral from "../../../assets/imgLateral.png";
import Header from "../../../components/Cabecalho";
import ResetPassword from "../../../components/recuperarSenha/RedefinirSenha";
import "../../../styles/App.css";

function RecuperarSenha() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <ResetPassword />
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;

