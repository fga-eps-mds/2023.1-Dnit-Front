import { Button } from "antd";
import { useEscolasCadastradas } from "../../../context/escolasCadastradasErro";
import "../../../styles/form/step3Listagem.css";

interface Step3Erro1Props {
  onClickVoltar: () => void;
}

export default function Step3_listagem({ onClickVoltar }: Step3Erro1Props) {
  const { escolasCadastradas } = useEscolasCadastradas();
  return (
    <div className="form3_erro1">
      <div className="secaoTexto">
        <h2>Apenas as escolas abaixo foram adicionadas:</h2>
        {escolasCadastradas.map((escola) => (
          <h2 key={escola}>{escola}</h2>
        ))}
      </div>
      <div className="secaoVoltar">
        <Button className="botaoVoltar" onClick={onClickVoltar}>
          Concluir
        </Button>
      </div>
    </div>
  );
}
