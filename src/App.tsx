import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdicionarSituacao from "./pages/ExibirInformacoesEscola";
import EsqueciSenha from "./pages/EsqueciSenha";
import Register from "./pages/Register";
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
      <Route path="/cadastro" element={<Register />} />
      <Route path="/exibirinformacoesescola" element={<ExibirInformacoesEscola />} />
      <Route path="/esqueciSenha" element={<EsqueciSenha />} />
      
    </Routes>
  );
}

export default App;
