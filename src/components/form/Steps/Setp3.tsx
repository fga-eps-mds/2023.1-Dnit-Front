import { Button, Form, Space } from "antd";
import "../../../styles/form/step3.css";
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
            <Form name="form3" onFinish={onFinish}>
                <Form.Item className="botaoEscolher">
                    <Space>
                        <Button className="botaoEscolherArquivo" htmlType="submit" type="primary" size="large" shape="round">
                            Escolha um arquivo
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
}