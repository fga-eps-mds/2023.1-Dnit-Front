import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CadastrarAcidentes from "./pages/Acidentes";
import CadastrarRodovias from "./pages/CadastrarRodovias";
import Dashboard from "./pages/Dashboard";
import EscolasCadastradas from "./pages/EscolasCadastradas";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import RegisterSchool from "./pages/RegisterSchool";
import ResetPassword from "./pages/ResetPassword";
import SolicitacaoAcao from "./pages/SolicitacaoAcao";
import TelaUPS from "./pages/TelaUPS";
import { AuthContext } from "./provider/Authentication";
import "./styles/App.css";

function App() {
  const { getAuth } = useContext(AuthContext);
  const isAuthenticated = getAuth();
  document.title = "DNIT";
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="*" element={<Navigate to="/escolas-cadastradas" />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<Register />} />
        </>
      )}
      <Route path="/cadastrarsinistros" element={<CadastrarAcidentes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/redefinirSenha" element={<ResetPassword />} />

      <Route path="/cadastrarescola" element={<RegisterSchool />} />
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />

      <Route path="/solicitacaoAcao" element={<SolicitacaoAcao />} />
      <Route path="/cadastrarRodovias" element={<CadastrarRodovias />} />
      <Route path="/telaUPS" element={<TelaUPS />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
