import Header from "../../../components/Header";
import RegistrarRodovias from "../../../components/cadastrarRodovias/RegistrarRodovias";
import Footer from "../../../components/Footer";
import "../../../styles/App.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/Autenticacao";
import { Permissao } from "../../../models/auth";

function CadastrarRodovias() {
  const navigate = useNavigate();
  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.RodoviaCadastrar)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Secao2">
        <RegistrarRodovias />
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarRodovias;
