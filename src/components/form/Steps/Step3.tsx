import { Button, Form, Space } from "antd";
import "../../../styles/form/step3.css";
import Dragdrop from "../../Upload/DragDrop"
interface Step1Props {
    onClickBack: () => void
}


export default function Step3({ onClickBack }: Step1Props) {
    function onFinish() {
        console.log("ok");
    }
    return (
        <div className="form3">
            <h2>Baixar Modelo de Arquivo</h2>
            <div className="secaoInserir">
                <Dragdrop />
            </div>
            <div className="container-botoes">
                <Button className="botaoCancelar" onClick={onClickBack}>
                    Cancelar
                </Button>
                <Button className="button1">
                    Inserir arquivo
                </Button>
            </div>
        </div>
    )
}