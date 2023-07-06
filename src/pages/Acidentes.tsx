import Header from "../components/Header";
import "../styles/App.css";
import CadAcidentes from "../components/form/CadAcidentes";
import { useState } from "react";
import { AcidentesProvider } from "../context/acidentesCadastrados";


function CadastrarAcidentes(){
    const [screen, setScreen] = useState<
    "sc1" | "sc2" | "sc3" | "sc4"
    >("sc1");

    return(
        
        <div className="App">
            <Header />
            <div className="Secao2">
                <div className="box">
                <AcidentesProvider>
                {screen === "sc1" &&(
                <CadAcidentes
                onClickBack={() => setScreen("sc1")}
                onClickError={() => setScreen("sc2")}
                onClickAceito={() => setScreen("sc3")}
                onClickErroJaCadastrada={() => setScreen("sc4")}
                />)}
                </AcidentesProvider>
                </div>
            </div>
        </div>
    );
}

export default CadastrarAcidentes;