import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Inicial from "./pages/Inicial";
import Login from "./pages/Login";
import AdicionarSituacao from "./pages/ExibirInformacoesEscola";

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
          <Route path="/home" element={<Inicial />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/exibirinformacoesescola" element={<ExibirInformacoesEscola />} />
    </Routes>
  );
}

export default App;
