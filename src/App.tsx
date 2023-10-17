import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CadastrarAcidentes from "./pages/cadastro/CadastrarSinistros";
import CadastrarRodovias from "./pages/cadastro/CadastrarRodovias";
import Dashboard from "./pages/info/dashboard/Dashboard";
import EscolasCadastradas from "./pages/info/escola/EscolasCadastradas";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import RecoverPassword from "./pages/senha/recuperarSenha/RecuperarSenha";
import Register from "./pages/cadastro/CadastrarUsuario";
import RegisterSchool from "./pages/cadastro/CadastrarEscola";
import ResetPassword from "./pages/senha/redefinirSenha/RedefinirSenha";
import SolicitacaoAcao from "./pages/solicitacao/SolicitacaoAcao";
import TelaUPS from "./pages/ups/TelaUPS";
import { AuthContext } from "./provider/Autenticacao";
import "./styles/App.css";

function App() {
  const { getAuth } = useContext(AuthContext);
  const isAuthenticated = getAuth();
  document.title = "DNIT";
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastrarsinistros" element={<CadastrarAcidentes />} />
          <Route path="/cadastrarescola" element={<RegisterSchool />} />
          <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />
          <Route path="/cadastrarRodovias" element={<CadastrarRodovias />} />
          <Route path="/telaUPS" element={<TelaUPS />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<Register />} />
        </>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/redefinirSenha" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/solicitacaoAcao" element={<SolicitacaoAcao />} />
    </Routes>
  );
}

export default App;
