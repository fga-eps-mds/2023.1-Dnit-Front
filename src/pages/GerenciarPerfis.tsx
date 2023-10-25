import { useState } from "react";
import Header from "../components/Cabecalho"
import TrilhaDeNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import Footer from "../components/Rodape";
import PerfilDialog from "../components/PerfilDialog";
import { PerfisTabela } from "../models/auth";

interface PerfilDialogArgs {
  id: string | null;
  readOnly: boolean;
}

export default function GerenciarPerfis() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [showPerfil, setShowPerfil] = useState<PerfilDialogArgs | null>(null);

  const onPerfilChange = (perfil: PerfisTabela | null) => {
    if (!perfil) {
      return;
    }

    // perfil criado ou editado
  }

  return (
    <div className="App">
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} registrarPerfis mostrarModal={() => setShowPerfil({id: null, readOnly: false})}></TrilhaDeNavegacao>
      {showPerfil != null && <PerfilDialog id={showPerfil.id} readOnly={showPerfil.readOnly} closeDialog={(perfil) => {setShowPerfil(null); onPerfilChange(perfil)}}/>}
      <Footer />
    </div>
  )
}