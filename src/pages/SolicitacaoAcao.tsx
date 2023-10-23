import personagem from "../assets/julia11.png";
import Header from "../components/Cabecalho";
import Footer from "../components/Footer";
import SolicitacaoAcaoForm from "../components/solicitarAcao/FormularioSolicitacaoAcao";
import "../styles/App.css";

function SolicitacaoAcao() {
  return (
    <div className="App">
      <Header hasLogged={true} />
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
      <Footer />
    </div>
  );
}

export default SolicitacaoAcao;
