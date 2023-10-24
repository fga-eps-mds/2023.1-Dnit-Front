import { useState } from "react";
import Header from "../components/Cabecalho"
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import Footer from "../components/Rodape";
import PerfilDialog from "../components/PerfilDialog";

export default function GerenciarPerfis() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [showPerfil, setShowPerfil] = useState(false);

  return (
    <div className="App">
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} registrarPerfis mostrarModal={setShowPerfil}></TrilhaDeNavegacao>
      {showPerfil && <PerfilDialog />}
      <Footer />
    </div>
  )
}