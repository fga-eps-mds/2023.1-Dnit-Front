import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import RecuperarSenha from "./pages/ReucperarSenha";
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
    </Routes>
  );
}

export default App;
