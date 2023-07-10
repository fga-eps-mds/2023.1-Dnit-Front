import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/form.css";
import Step1_Rodovias from "./Steps_Rodovias/Step1_Rodovias";
import Step2_Rodovias_Aceito from "./Steps_Rodovias/Step2_Rodovias_Aceito";
import Step3_Rodovias_erro from "./Steps_Rodovias/Step3_Rodovias_erro1";

function RegistrarRodovias() {
  const [screen, setScreen] = useState<"form1" | "form2" | "form3">("form1");
  const returnPage = useNavigate();
  return (
    <div className="form">
      <Form.Provider>
        {screen === "form1" && (
          <Step1_Rodovias
            onClickAceito={() => {
              setScreen("form2");
            }}
            onClickErroTamanho={() => setScreen("form3")}
            onClickBack={() => returnPage("/dashboard")}
          ></Step1_Rodovias>
        )}
        {screen === "form2" && (
          <Step2_Rodovias_Aceito
            onClickVoltar={() => returnPage("/dashboard")}
          />
        )}
        {screen === "form3" && (
          <Step3_Rodovias_erro onClickVoltar={() => setScreen("form1")} />
        )}
      </Form.Provider>
    </div>
  );
}
export default RegistrarRodovias;
