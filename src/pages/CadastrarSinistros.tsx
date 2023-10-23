import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Cabecalho";
import CadAcidentes from "../components/cadastrarSinistros/CadastrarSinistros";
import AcidentesAceito from "../components/cadastrarSinistros/SinistrosAceito";
import Acidentes_erro1 from "../components/cadastrarSinistros/SinistrosErro1";
import "../styles/App.css";
import Footer from "../components/Footer";

function CadastrarAcidentes() {
  const [screen, setScreen] = useState<"sc1" | "sc2" | "sc3">("sc1");
  const returnPage = useNavigate();

  return (
    <div className="App">
      <Header />
      <div className="Secao2">
        <div className="box">
          <div className="formrs">
            {screen === "sc1" && (
              <CadAcidentes
                onClickBack={() => returnPage("/dashboard")}
                onClickError={() => setScreen("sc2")}
                onClickAceito={() => setScreen("sc3")}
              />
            )}

            {screen === "sc2" && (
              <Acidentes_erro1 onClickVoltar={() => setScreen("sc1")} />
            )}
            {screen === "sc3" && (
              <AcidentesAceito onClickVoltar={() => setScreen("sc1")} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarAcidentes;
