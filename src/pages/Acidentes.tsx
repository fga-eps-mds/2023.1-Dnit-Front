import Header from "../components/Header";
import "../styles/App.css";
import CadAcidentes from "../components/form/CadAcidentes";
import { useState } from "react";
import Acidentes_erro1 from "../components/form/Steps/AcidentesErro1";
import AcidentesAceito from "../components/form/Steps/AcidentesAceito";

function CadastrarAcidentes(){
    const [screen, setScreen] = useState<
    "sc1" | "sc2" | "sc3"
    >("sc1");

    return(
        
        <div className="App">
            <Header />
            <div className="Secao2">
                <div className="box">
                    <div className="formrs">
                    
                    {screen === "sc1" &&(
                    <CadAcidentes
                    onClickBack={() => setScreen("sc1")}
                    onClickError={() => setScreen("sc2")}
                    onClickAceito={() => setScreen("sc3")}
                
                />)}
                    
                {screen === "sc2" && (
                    <Acidentes_erro1 onClickVoltar={() => setScreen("sc1")} />
                    )}
                {screen === "sc3" &&(
                    <AcidentesAceito onClickVoltar={() => setScreen("sc1")}/>
                )}
                </div>
            </div>
            </div>
        </div>
    );
}

export default CadastrarAcidentes;