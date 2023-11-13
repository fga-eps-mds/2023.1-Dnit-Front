import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CadastrarAcidentes from "./pages/cadastro/CadastrarSinistros/";
import CadastrarRodovias from "./pages/cadastro/CadastrarRodovias";
import Dashboard from "./pages/info/Dashboard/";
import EscolasCadastradas from "./pages/info/escola/EscolasCadastradas/";
import Home from "./pages/Home/";
import Login from "./pages/Login/";
import RecoverPassword from "./pages/senha/Recuperar/";
import Register from "./pages/cadastro/CadastrarUsuario";
import RegisterSchool from "./pages/cadastro/CadastrarEscola";
import ResetPassword from "./pages/senha/Redefinir/";
import SolicitacaoAcao from "./pages/SolicitacaoAcao/";
import GerenciarPerfis from "./pages/gerencia/GerenciarPerfis";
import GerenciarUsuario from "./pages/gerencia/GerenciarUsuario";
import { AuthContext, configuraAutenticacaoAxios } from "./provider/Autenticacao";
import "./styles/App.css";
import Ranque from "./pages/Ranque";

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
          <Route path="/ranque" element={<Ranque />} />
          <Route path="/gerenciarUsuario" element={<GerenciarUsuario />}/>
          <Route path="/gerenciarPerfis" element={<GerenciarPerfis />} />
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
