import "../../../styles/form/step3_1.css"
import {Button, Form, Space} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"

interface Step2_Rodovias_Aceito {
    onClickVoltar: () => void;
}

export default function Step2_Rodovias_Aceito({onClickVoltar}: Step2_Rodovias_Aceito) {
    return (
        <div className="form3_1">
            <div className="secaoTexto">
                <h2>Inserção de arquivos concluída com sucesso</h2>
                <CheckCircleOutlined className="boaoCheck" />
            </div>
            <div className="secaoVoltar">
                <Button className="botaoVoltar" onClick={onClickVoltar}>
                    Concluir
                </Button>
            </div>

        </div>
    )    
}
