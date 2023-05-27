import imgLateral from "../assets/imgLateral.png";
import Header from "../components/Header";
import "../styles/App.css";

function Inicial() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
      </div>
    </div>
  );
}

export default Inicial;
