import "../../styles/form/step3.css";
import Dragdrop from "../Upload/DragDropAcidentes";


interface Step1_AcidentesProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
  onClickErroJaCadastrada: () => void;
}

export default function CadAcidentes({
  onClickBack,
  onClickError,
  onClickAceito,
  onClickErroJaCadastrada,
}: Step1_AcidentesProps) {
  return (
    <div className="form3">
      <h2>Inserir Sinistros via planilha</h2>
      <div className="secaoInserir">
        <Dragdrop
          onClickBack={onClickBack}
          onClickError={onClickError}
          onClickAceito={onClickAceito}
          onClickErroJaCadastrada={onClickErroJaCadastrada}
        />
      </div>
    </div>
  );
}
