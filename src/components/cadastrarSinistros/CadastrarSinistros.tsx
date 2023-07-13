import "../../styles/form/step3.css";
import Dragdrop from "./UploadPlanilhaSinistros";

interface Step1AcidentesProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
}

export default function CadAcidentes({
  onClickBack,
  onClickError,
  onClickAceito,
}: Step1AcidentesProps) {
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
