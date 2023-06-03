import personagem from "../assets/julia11.png";
import background from "../assets/fundo01.png";
import Header from "../components/Header";
import SolicitacaoAcaoForm from "../components/form/FormularioSolicitacaoAcao";
import "../styles/App.css";

function SolicitacaoAcao() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <div className=" Lateral">
          <img className="imgLateral" src={personagem} alt="Personagem" />
          <img className="imgLateral" src={background} alt="Background" />
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