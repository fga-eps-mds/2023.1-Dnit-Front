import "../../styles/form.css";
import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step3_Aceito from "./Steps/Step3_Aceito";
import Step3_erro1 from "./Steps/Step3_erro1";
import Step3_erro2 from "./Steps/Step3_erro2";
import { Form } from "antd";
import { EscolasCadastradasProvider } from "../../context/escolasCadastradasErro";
export default function RegS() {

    const [screen, setScreen] = useState<"form1" | "form2" | "form3" | "form3_1" | "form3_erro1" | "form3_erro2">("form1");
    return (
        <div className="formrs">

            <Form.Provider
                onFormFinish={(name) => {
                    if (name === "form2") {
                        console.log("form2");

                    }
                }}
            >
                    {screen === "form1" && (
                        <Step1 onClick={() => setScreen("form2")} onClickCSV={() => setScreen("form3")} /> 
                    )}
                    {screen === "form2" && (
                        <Step2 onClickBack={() => setScreen("form1")} />
                    )}
                <EscolasCadastradasProvider>
                    {screen === "form3" && (
                        <Step3 onClickBack={() => setScreen("form1")} onClickError={() => setScreen("form3_erro2")} onClickAceito={() => setScreen("form3_1")} onClickErroJaCadastrada={() => setScreen("form3_erro1")}/>
                    )}
                    {screen === "form3_1" && (
                        <Step3_Aceito onClickVoltar={() => setScreen("form1")} />
                    )}
                    {screen === "form3_erro1" && (
                        <Step3_erro1 onClickVoltar={ () => setScreen("form1")} />
                    )}
                    {screen === "form3_erro2" && (
                        <Step3_erro2 onClickVoltar={ () => setScreen("form1")} />
                    )}
                </EscolasCadastradasProvider>
            </Form.Provider>
        </div>
    );
}


