import TrilhaNavegacao from "../components/escolasCadastradas/Navegacao";
import FiltragemTabela from "../components/escolasCadastradas/Tabela/Filtro";
import Footer from "../components/Footer";
import TabelaEscola from "../components/escolasCadastradas/Tabela/Tabela";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/Autenticacao";
import { Permissao } from "../models/auth";
import { useNavigate } from "react-router-dom";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];

  const navigate = useNavigate();
  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.EscolaVisualizar)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao
        elementosLi={paginas}
        escolasCadastradas
      ></TrilhaNavegacao>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
