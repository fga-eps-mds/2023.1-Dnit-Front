import logoDnit from "../assets/logoDnit.png";
import Header from "../components/Header";
import SolicitacaoAcaoForm from "../components/form/FormularioSolicitacaoAcao";
import "../styles/App.css";

function SolicitacaoAcao() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="logoDnit" src={logoDnit} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <SolicitacaoAcaoForm />
        </div>
      </div>
    </div>
  );
}

export default SolicitacaoAcao;