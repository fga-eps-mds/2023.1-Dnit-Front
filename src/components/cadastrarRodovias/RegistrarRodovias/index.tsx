import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/form.css";
import ImportarRodovias from "../planilha/ImportarPlanilha";
import RodoviasAceito from "../validacao/RodoviasAceito";
import RodoviasErro from "../validacao/RodoviasErro";

function RegistrarRodovias() {
  const [screen, setScreen] = useState<"form1" | "form2" | "form3">("form1");
  const returnPage = useNavigate();
  return (
    <div className="form">
      <Form.Provider>
        {screen === "form1" && (
          <ImportarRodovias
            onClickAceito={() => {
              setScreen("form2");
            }}
            onClickErroTamanho={() => setScreen("form3")}
            onClickBack={() => returnPage("/dashboard")}
          ></ImportarRodovias>
        )}
        {screen === "form2" && (
          <RodoviasAceito
            onClickVoltar={() => returnPage("/dashboard")}
          />
        )}
        {screen === "form3" && (
          <RodoviasErro onClickVoltar={() => setScreen("form1")} />
        )}
      </Form.Provider>
    </div>
  );
}
export default RegistrarRodovias;
