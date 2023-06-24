import "../../../styles/form/step3_1.css"
import { Button, Form, Space } from "antd";

interface Step3_1Props {
    onClickVoltar: () => void;
}

export default function Step3_Aceito({onClickVoltar }: Step3_1Props) {
    return (

        <div className="form3_1">
            <h2>Inserção de arquivos concluída com sucesso</h2>
            <Form>
                <Form.Item className="insbutton" >
                    <Space>
                        <Button className="button1" type="primary" size="large" shape="round" onClick={onClickVoltar}>
                            Voltar
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
}