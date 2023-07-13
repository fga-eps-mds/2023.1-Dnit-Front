import "../../../styles/form/step3.css";
import Dragdrop from "../UploadPlanilha/DragDrop";
interface Step1RodoviasProps {
    onClickBack: () => void;
    onClickErroTamanho: () => void;
    onClickAceito: () => void;
}

export default function Step1_Rodovias({
    onClickBack,
    onClickErroTamanho,
    onClickAceito,
}: Step1RodoviasProps) {
    return (
        <div className="form3">
            <h2>Inserir rodovias via planilha</h2>
            <div className="secaoInserir">
                <Dragdrop
                    onClickBack={onClickBack}
                    onClickErrorTamanho={onClickErroTamanho}
                    onClickAceito={onClickAceito}
                />
            </div>
        </div>
    );
}