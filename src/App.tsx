import "./App.css";
import imgLateral from "./assets/imgLateral.png";
import LoginForm from "./components/FormularioLogin";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;
