import personagem from "../../assets/julia11.png";
import Header from "../../components/Header";
import SolicitacaoAcaoForm from "../../components/SolicitarAcaoForm";
import "../../styles/App.css";
import Footer from "../../components/Footer";

function SolicitacaoAcao() {
  return (
    <div className="App">
      <Header hasLogged={false} />
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
      <Footer home />
    </div>
  );
}

export default SolicitacaoAcao;
