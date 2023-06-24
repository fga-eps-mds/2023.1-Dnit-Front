import { Button, Form, Space } from "antd";
import "../../../styles/form/step3.css";
import Dragdrop from "../../Upload/DragDrop"
import fetchInsertFile from "../../../service/insertFile";
interface Step1Props {
    onClickBack: () => void
    onClickAceito: () => void
}

const enviarArquivo =async (values: any) => {
    try{
        //await fetchInsertFile()
    }
    catch{

    }
};

export default function Step3({ onClickBack, onClickAceito }: Step1Props) {
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
                <Button className="button1" onClick={onClickAceito}>
                    Inserir arquivo
                </Button>
            </div>
        </div>
    )
}