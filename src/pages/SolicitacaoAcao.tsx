import personagem from "../assets/julia11.png";
import Header from "../components/Header";
import SolicitacaoAcaoForm from "../components/form/FormularioSolicitacaoAcao";
import "../styles/App.css";

function SolicitacaoAcao() {
  return (
    <div className="App">
      <Header login />
      <div className="Secao">
        <div className="Lateral">
          <div className=" Lateral">
            <img className="imgLateral" src={personagem} alt="personagem" />
          </div>
        </div>

        <div className="Central">
          <SolicitacaoAcaoForm />
        </div>
      </div>
    </div>
  );
}

export default SolicitacaoAcao;
