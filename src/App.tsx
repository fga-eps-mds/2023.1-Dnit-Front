import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CadastrarAcidentes from "./pages/CadastrarSinistros";
import CadastrarRodovias from "./pages/CadastrarRodovias";
import Dashboard from "./pages/Dashboard";
import EscolasCadastradas from "./pages/EscolasCadastradas";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecuperarSenha";
import Register from "./pages/CadastrarUsuario";
import RegisterSchool from "./pages/CadastrarEscola";
import ResetPassword from "./pages/RedefinirSenha";
import SolicitacaoAcao from "./pages/SolicitacaoAcao";
import TelaUPS from "./pages/TelaUPS";
import { AuthContext, configuraAutenticacaoAxios } from "./provider/Autenticacao";
import "./styles/App.css";

function App() {
  const { getAuth } = useContext(AuthContext);
  const isAuthenticated = getAuth();
  document.title = "DNIT";
  configuraAutenticacaoAxios();
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
