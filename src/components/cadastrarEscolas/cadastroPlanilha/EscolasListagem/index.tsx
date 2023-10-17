import { Button } from "antd";
import { useEscolasCadastradas } from "../../../../context/escolasCadastradasErro";
import "./styles.css";

interface EscolasListagemProps {
  onClickVoltar: () => void;
}

export default function EscolasListagem({ onClickVoltar }: EscolasListagemProps) {
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
