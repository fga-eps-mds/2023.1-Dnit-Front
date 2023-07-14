import "../../styles/form/step3.css";
import Dragdrop from "./UploadPlanilha";
interface ImportarRodoviasProps {
    onClickBack: () => void;
    onClickErroTamanho: () => void;
    onClickAceito: () => void;
}

export default function ImportarRodovias({
    onClickBack,
    onClickErroTamanho,
    onClickAceito,
}: ImportarRodoviasProps) {
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