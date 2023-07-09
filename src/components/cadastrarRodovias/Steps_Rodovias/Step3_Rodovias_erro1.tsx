import { Button } from "antd";
import "../../../styles/form/step3ErroTamanho.css";

interface Step3RodoviasErroProps {
    onClickVoltar: () => void;
}


export default function Step3_Rodovias_erroProps({ onClickVoltar }: Step3RodoviasErroProps) {
    return (
        <div className="form3_erro1">
            <div className="secaoTexto">
                <h2>Erro na inserção das rodovias!</h2>
                <h2>Tamanho do arquivo excedido</h2>
                <h2>
                    {"("} Máximo 10000 linhas {")"}
                </h2>
            </div>
            <div className="secaoVoltar">
                <Button className="botaoVoltar" onClick={onClickVoltar}>
                    Concluir
                </Button>
            </div>
        </div>
    )
}