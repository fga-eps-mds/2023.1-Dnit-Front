import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Inicial from "./pages/Inicial";
import Login from "./pages/Login";
import EscolasCadastradas from "./pages/EscolasCadastradas";
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
      <Route path="/escolas-cadastradas" element={<EscolasCadastradas />} />

    </Routes>
  );
}

export default App;
