import { Form } from "antd";
import { useState } from "react";
import { EscolasCadastradasProvider } from "../../context/escolasCadastradasErro";
import "../../styles/form.css";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step3_Aceito from "./Steps/Step3_Aceito";
import Step3_listagem from "./Steps/Step3_Listagem";
import Step3_erroTamanho from "./Steps/Step3_erroTamanho";
export default function RegS() {
  const [screen, setScreen] = useState<
    "form1" | "form2" | "form3" | "form3_1" | "form3_listagem" | "form3_erroTamanho"
  >("form1");
  return (
    <div className="formrs">
      <Form.Provider>
        {screen === "form1" && (
          <Step1
            onClick={() => setScreen("form2")}
            onClickCSV={() => setScreen("form3")}
          />
        )}
        {screen === "form2" && <Step2 onClickBack={() => setScreen("form1")} />}
        <EscolasCadastradasProvider>
          {screen === "form3" && (
            <Step3
              onClickBack={() => setScreen("form1")}
              onClickError={() => setScreen("form3_erroTamanho")}
              onClickAceito={() => setScreen("form3_1")}
              onClickErroJaCadastrada={() => setScreen("form3_listagem")}
            />
          )}
          {screen === "form3_1" && (
            <Step3_Aceito onClickVoltar={() => setScreen("form1")} />
          )}
          {screen === "form3_listagem" && (
            <Step3_listagem onClickVoltar={() => setScreen("form1")} />
          )}
          {screen === "form3_erroTamanho" && (
            <Step3_erroTamanho onClickVoltar={() => setScreen("form1")} />
          )}
        </EscolasCadastradasProvider>
      </Form.Provider>
    </div>
  );
}
