import { Button } from "antd";
import Icone_aviso from "../../../assets/icons/iconeAviso.svg";
import { useEscolasCadastradas } from "../../../context/escolasCadastradasErro";
import "../../../styles/form/step3_erro1.css";

interface Step3Erro1Props {
  onClickVoltar: () => void;
}

export default function Step3_erro1({ onClickVoltar }: Step3Erro1Props) {
  const { escolasCadastradas } = useEscolasCadastradas();
  return (
    <div className="form3_erro1">
      <div className="secaoTexto">
        <div className="secaoAtencao">
          <Icone_aviso />
          <h1>Atenção</h1>
        </div>
        <h2>As escolas nas linhas</h2>
        {escolasCadastradas.map((escola) => (
          <h2 key={escola}>{escola}</h2>
        ))}
        <h2>não foram cadastradas pois já existem no sistema.</h2>
      </div>
      <div className="secaoVoltar">
        <Button className="botaoVoltar" onClick={onClickVoltar}>
          Concluir
        </Button>
      </div>
    </div>
  );
}
