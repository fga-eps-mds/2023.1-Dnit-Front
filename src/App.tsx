import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EscolasCadastradas from "./pages/EscolasCadastradas";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { AuthContext } from "./provider/Authentication";
import "./styles/App.css";

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
      <Route path="/esqueciSenha" element={<RecoverPassword />} />
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />
    </Routes>
  );
}

export default App;
