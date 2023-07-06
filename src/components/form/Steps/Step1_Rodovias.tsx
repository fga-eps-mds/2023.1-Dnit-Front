import "../../../styles/form/step3.css";
import Dragdrop from "../../Upload/DragDrop";
interface Step1_RodoviasProps{
    onClickBack: () => void;
    onClickError: () => void;
    onClickAceito: () => void;
}

export default function Step1_Rodovias({
    onClickBack,
    onClickError,
    onClickAceito,
}: Step1_RodoviasProps) {
    return(
        <div className="form3">
            <h2>Inserir rodovias via planilha</h2>
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