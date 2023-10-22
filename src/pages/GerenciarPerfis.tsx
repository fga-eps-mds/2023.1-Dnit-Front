import TrilhaNavegacao from "../components/escolasCadastradas/TrilhaNavegacao";
import Footer from "../components/Rodape";
import Header from "../components/escolasCadastradas/CabecalhoListaEscolas";
import "../styles/App.css";
import ModalEditarPerfil from "../components/gerenciarPerfis/ModalEditarPerfil";
import { ChangeEvent, useState } from "react";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  const [isVisible, setIsVisible] = useState(false);
  const [nomeFiltro, setNomeFiltro] = useState("");

    const handleNomeFiltro = (event: ChangeEvent<HTMLInputElement>) => {
        setNomeFiltro((event.target.value))
    };
    
    const FiltroPerfis = () => {
        return (<div className="br-input medium input-button"
        style={{
            maxWidth: "300px",
            marginLeft: "70px",
            textAlign: "initial",
        }}>
          <label htmlFor="input-search-medium">Nome</label>
          <input
            id="input-search-medium"
            type="search"
            value={nomeFiltro}
            onChange={handleNomeFiltro}
            placeholder="Nome"
          />
          <button
            className="br-button"
            type="button"
            aria-label="Buscar"
            data-testid="buscar-nome"
          >
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>)
    }
  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao elementosLi={paginas} registrarPerfis mostrarModal={setIsVisible}></TrilhaNavegacao>
      {isVisible && <ModalEditarPerfil open={isVisible} close={() => { setIsVisible(false)}} />}
      <FiltroPerfis />
      Tabela
      <Footer />
    </div>
  );
}
