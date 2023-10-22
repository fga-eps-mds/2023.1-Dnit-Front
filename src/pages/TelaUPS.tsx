import { useContext, useEffect } from "react";
import Header from "../components/Cabecalho";
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
      <Header dashboard />
      <UPSForm />
    </div>
  );
}

export default TelaUPS;
