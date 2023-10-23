import Header from "../components/Cabecalho";
import Footer from "../components/Footer";
import UPSForm from "../components/visualizarUps/FormularioUPS";
import "../styles/App.css";

function TelaUPS() {
  return (
    <div className="App">
      <div className="page-content">
        <Header hasLogged={true} />
        <UPSForm />
        <div className="footer-small-page">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default TelaUPS;
