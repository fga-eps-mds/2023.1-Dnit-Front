import "../../styles/form/step3_1.css"
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"

interface RodoviasAceito {
    onClickVoltar: () => void;
}

export default function RodoviasAceito({ onClickVoltar }: RodoviasAceito) {
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
