import Header from "../components/Cabecalho";
import UPSForm from "../components/visualizarUps/FormularioUPS";
import "../styles/App.css";

function TelaUPS() {
  return (
    <div className="App">
      <Header hasLogged={true} />
      <UPSForm />
    </div>
  );
}

export default TelaUPS;
