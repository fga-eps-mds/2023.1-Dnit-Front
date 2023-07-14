import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "../../styles/form/step3_1.css";

interface SinistrosAceitoProps {
  onClickVoltar: () => void;
}

export default function SinistrosAceito({ onClickVoltar }: SinistrosAceitoProps) {
  return (
    <div className="form3_1">
      <div className="secaoTexto">
        <h2>Inserção de arquivos concluída com sucesso</h2>
        <CheckCircleOutlined className="botaoCheck" />
      </div>
      <div className="secaoVoltar">
        <Button className="botaoVoltar" onClick={onClickVoltar}>
          Concluir
        </Button>
      </div>
    </div>
  );
}
