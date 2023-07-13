import { Form } from "antd";
import { useState } from "react";
import { EscolasCadastradasProvider } from "../../context/escolasCadastradasErro";
import "../../styles/form.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step3Aceito from "./Step3Aceito";
import Step3Listagem from "./Step3Listagem";
import Step3ErroTamanho from "./Step3ErroTamanho";
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
            <Step3Aceito onClickVoltar={() => setScreen("form1")} />
          )}
          {screen === "form3_listagem" && (
            <Step3Listagem onClickVoltar={() => setScreen("form1")} />
          )}
          {screen === "form3_erroTamanho" && (
            <Step3ErroTamanho onClickVoltar={() => setScreen("form1")} />
          )}
        </EscolasCadastradasProvider>
      </Form.Provider>
    </div>
  );
}
