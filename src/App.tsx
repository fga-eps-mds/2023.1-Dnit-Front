import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EscolasCadastradas from "./pages/EscolasCadastradas";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import RegisterSchool from "./pages/RegisterSchool";
import ResetPassword from "./pages/ResetPassword";
import TelaUPS from "./pages/TelaUPS";
import { AuthContext } from "./provider/Authentication";
import "./styles/App.css";
import CadastrarRodovias from "./pages/CadastrarRodovias";

function App() {
  const { getAuth } = useContext(AuthContext);
  const isAuthenticated = getAuth();
  document.title = "DNIT";
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="*" element={<Navigate to="/escolas-cadastradas" />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<Register />} />
        </>
      )}
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />
      <Route path="/cadastrarescola" element={<RegisterSchool />} />
      <Route path="/login" element={<Login />} />
      <Route path="/redefinirSenha" element={<ResetPassword />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/cadastrarRodovias" element={<CadastrarRodovias />} />
      <Route path="/telaUPS" element={<TelaUPS />} />
    </Routes>
  );
}

export default App;
