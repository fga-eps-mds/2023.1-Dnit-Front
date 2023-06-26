import { Button, Form, Space } from "antd";
import "../../../styles/form/step3.css";
import Dragdrop from "../../Upload/DragDrop"
import fetchInsertFile from "../../../service/insertFile";
interface Step1Props {
    onClickBack: () => void
    onClickError: () => void
    onClickAceito: () => void
    onClickErroJaCadastrada: () => void
}

export default function Step3({ onClickBack, onClickError, onClickAceito, onClickErroJaCadastrada }: Step1Props) {
    function onFinish() {
        console.log("ok");
    }
    return (
        <div className="form3">
            <h2>Inserir escolas via planilha</h2>
            <div className="secaoInserir">
                <Dragdrop onClickBack={onClickBack} onClickError={onClickError} onClickAceito={onClickAceito} onClickErroJaCadastrada={onClickErroJaCadastrada}/>
            </div>
        </div>
    )
}