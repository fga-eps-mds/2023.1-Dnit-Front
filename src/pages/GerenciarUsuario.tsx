import TrilhaNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import FiltragemTabela from "../components/escolasCadastradas/FiltragemTabela";
import Footer from "../components/Footer";
import TabelaEscola from "../components/escolasCadastradas/TabelaEscola";
import { FiltroProvider } from "../context/FiltroTabela";
import "../styles/App.css";
import Header from "../components/Cabecalho";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/Autenticacao";
import { Permissao } from "../models/auth";
import { useNavigate } from "react-router-dom";

export default function GerenciarUsuario() {
  const paginas = [{ nome: "Logout", link: "/login" }];

  const navigate = useNavigate();
  // const { temPermissao } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!temPermissao(Permissao.UsuarioGerenciar)) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="App">
      <Header />
      <p>Texto teste</p>
      <Footer />
    </div>
  );
}