import TrilhaNavegacao from "../../../../components/Navegacao";
import FiltragemTabela from "../../../../components/escolasCadastradas/tabela/Filtro";
import Footer from "../../../../components/Footer";
import TabelaEscola from "../../../../components/escolasCadastradas/tabela/Tabela";
import { FiltroProvider } from "../../../../context/FiltroTabela";
import "../../../../styles/App.css";
import Header from "../../../../components/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../provider/Autenticacao";
import { Permissao } from "../../../../models/auth";
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
      {!temPermissao(Permissao.EscolaCadastrar)? 
        <TrilhaNavegacao
          elementosLi={paginas} />
          : <TrilhaNavegacao
          elementosLi={paginas}
          escolasCadastradas />
        }
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
