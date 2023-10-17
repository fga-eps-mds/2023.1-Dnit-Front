import "../../styles/form/step3.css";
import Dragdrop from "./planilha/UploadPlanilhaSinistros";

interface ImportarAcidentesProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
}

export default function CadastrarSinistros({
  onClickBack,
  onClickError,
  onClickAceito,
}: ImportarAcidentesProps) {
  return (
    <div className="form3">
      <h2>Inserir Sinistros via planilha</h2>
      <div className="secaoInserir">
        <Dragdrop
          onClickBack={onClickBack}
          onClickError={onClickError}
          onClickAceito={onClickAceito}
        />
      </div>
    </div>
  );
}
