import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default App;
