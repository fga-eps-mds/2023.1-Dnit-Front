import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EscolasCadastradas from "./pages/EscolasCadastradas";
import RecoverPassword from "./pages/RecoverPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthContext } from "./provider/Authentication";
import "./styles/App.css";
import RegisterSchool from "./pages/RegisterSchool";
import ExibirInformacoesEscola from "./pages/ExibirInformacoesEscola";


function App() {
  const { getAuth } = useContext(AuthContext);
  const isAuthenticated = getAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<Register />} />
        </>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/redefinirSenha" element={<ResetPassword />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/cadastrarescola" element={<RegisterSchool />} />
      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />
    </Routes>
  );
}

export default App;
