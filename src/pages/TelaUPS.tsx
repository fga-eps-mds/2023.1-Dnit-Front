import { useContext, useEffect } from "react";
import Header from "../components/Cabecalho";
import Footer from "../components/Footer";
import UPSForm from "../components/visualizarUps/FormularioUPS";
import { Permissao } from "../models/auth";
import "../styles/App.css";
import { AuthContext } from "../provider/Autenticacao";
import { useNavigate } from "react-router-dom";

function TelaUPS() {
  const navigate = useNavigate();
  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.UpsVisualizar)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Header hasLogged={true} />
      <div className="page-content">
        <UPSForm />
      </div>
      <div className="footer-small-page">
          <Footer />
      </div>
    </div>
  );
}

export default TelaUPS;
