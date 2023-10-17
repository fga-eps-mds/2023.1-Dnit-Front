import { Form } from "antd";
import { useState } from "react";
import { EscolasCadastradasProvider } from "../../context/escolasCadastradasErro";
import "../estilo/form/form.css";
import OpcoesCadastro from "./OpcoesCadastro";
import FormularioCadastro from "./cadastroManual/FormularioCadastro";
import PlanilhaEscola from "./cadastroPlanilha/ImportarPlanilhaEscolas";
import PlanilhaAceita from "./cadastroPlanilha/EscolasAceito";
import PlanilhaListagem from "./cadastroPlanilha/EscolasListagem";
import PlanilhaErroTamanho from "./cadastroPlanilha/PlanilhaErroTamanho";
export default function RegS() {
  const [telaAtual, setTelaAtual] = useState<
    "form1" | "form2" | "form3" | "form3_1" | "form3_listagem" | "form3_erroTamanho"
  >("form1");
  return (
    <div className="formrs">
      <Form.Provider>
        {telaAtual === "form1" && (
          <OpcoesCadastro
            onClick={() => setTelaAtual("form2")}
            onClickCSV={() => setTelaAtual("form3")}
          />
        )}
        {telaAtual === "form2" && <FormularioCadastro onClickBack={() => setTelaAtual("form1")} />}
        <EscolasCadastradasProvider>
          {telaAtual === "form3" && (
            <PlanilhaEscola
              onClickBack={() => setTelaAtual("form1")}
              onClickError={() => setTelaAtual("form3_erroTamanho")}
              onClickAceito={() => setTelaAtual("form3_1")}
              onClickErroJaCadastrada={() => setTelaAtual("form3_listagem")}
            />
          )}
          {telaAtual === "form3_1" && (
            <PlanilhaAceita onClickVoltar={() => setTelaAtual("form1")} />
          )}
          {telaAtual === "form3_listagem" && (
            <PlanilhaListagem onClickVoltar={() => setTelaAtual("form1")} />
          )}
          {telaAtual === "form3_erroTamanho" && (
            <PlanilhaErroTamanho onClickVoltar={() => setTelaAtual("form1")} />
          )}
        </EscolasCadastradasProvider>
      </Form.Provider>
    </div>
  );
}
