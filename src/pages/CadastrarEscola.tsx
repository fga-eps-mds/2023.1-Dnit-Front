import React, { useContext, useEffect } from "react";
import Header from "../components/Cabecalho";
import RegS from "../components/cadastrarEscolas/CadastrarEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";
import { AuthContext } from "../provider/Autenticacao";
import { useNavigate } from "react-router-dom";
import { Permissao } from "../models/auth";

function RegisterSchool() {
  const navigate = useNavigate();
  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.EscolaCadastrar)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Header dashboard />
      <div className="Secao2">
        <div className="box">
          <FiltroProvider>
            <RegS />
          </FiltroProvider>
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;
