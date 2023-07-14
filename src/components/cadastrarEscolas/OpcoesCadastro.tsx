import { Button, Form, Space } from "antd";
interface OpcoesCadastroEscolaProps {
    onClick: () => void
    onClickCSV?: () => void
}


export default function OpcoesCadastroEscola({ onClick, onClickCSV }: OpcoesCadastroEscolaProps) {
    return (

        <div className="form1">
            <h2>Escolha como cadastrar</h2>
            <Form>
                <Form.Item className="insbutton" >
                    <Space>
                        <Button className="button1" type="primary" size="large" shape="round" onClick={onClick}>
                            Inserindo informações
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item className="insbutton">
                    <Space>
                        <Button className="button1" type="primary" size="large" shape="round" onClick={onClickCSV}>
                            Utilizando Arquivo CSV
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
}