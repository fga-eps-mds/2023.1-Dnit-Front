import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
<<<<<<< HEAD
import AdicionarSituacao from "./pages/ExibirInformacoesEscola";

=======
import EscolasCadastradas from "./pages/EscolasCadastradas";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
>>>>>>> 9abff3df80db5b6fdf05ededf6b0ae384a8dede9
import { AuthContext } from "./provider/Authentication";
import "./styles/App.css";
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
<<<<<<< HEAD
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/exibirinformacoesescola" element={<ExibirInformacoesEscola />} />
=======
      <Route path="/redefinirSenha" element={<ResetPassword />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />
>>>>>>> 9abff3df80db5b6fdf05ededf6b0ae384a8dede9
    </Routes>
  );
}

export default App;
