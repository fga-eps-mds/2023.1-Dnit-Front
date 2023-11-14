import { Button } from "antd";

interface SinistrosErroProps {
  onClickVoltar: () => void;
}

export default function SinistrosErro({ onClickVoltar }: SinistrosErroProps) {
  return (
    <div className="form3_erro1">
      <div className="secaoTexto">
        <h2>Erro na inserção dos Acidentes!</h2>
        <h2>Tamanho do arquivo excedido</h2>
        <h2>
          {"("}Máximo 5000 linhas{")"}
        </h2>
      </div>
      <div className="secaoVoltar">
        <Button className="botaoVoltar" onClick={onClickVoltar}>
          Concluir
        </Button>
      </div>
    </div>
  );
}
