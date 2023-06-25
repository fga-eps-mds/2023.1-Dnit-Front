import "../../../styles/form/step3_1.css"
import { Button, Form, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface Step3_1Props {
    onClickVoltar: () => void;
}

export default function Step3_Aceito({onClickVoltar }: Step3_1Props) {
    return (

        <div className="form3_1">
            <div className="secaoTexto">
                <h2>Inserção de arquivos concluída com sucesso</h2>
                <CheckCircleOutlined className="botaoCheck" />
            </div>
            <div className="secaoVoltar">
                <Button className="botaoVoltar" onClick={onClickVoltar}>
                    Voltar
                </Button>
            </div>
        </div>
    )
}