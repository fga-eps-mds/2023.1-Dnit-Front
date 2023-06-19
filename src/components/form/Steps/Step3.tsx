import { Button, Form, Input, Select, Space } from "antd";
const { Option } = Select;
interface Step3Props {
    onClickBack: () => void
}

export default function Step3({ onClickBack }: Step3Props) {
    const onFinish = async (values: any) => {
        console.log("OK");
    };
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: "Preencha o campo ${name}!",
        },
    ];
    return (

        
        <div>
            <h2>Informações Adicionais</h2>
            <Form
                form={form}
                name="form3"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                className="form-email"
            >
                <div>
                    <div className="bloco3">
                        <Form.Item name="telefone" label="Telefone" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="ciclos de ensino" label="Ciclos de Ensino" rules={rules}>
                            <Select
                                mode="multiple"
                            >

                                <Option value="infantil">Ensino Infantil</Option>
                                <Option value="fundamental1">Ensino Fundamental - 1º, 2º e 3º ano</Option>
                                <Option value="fundamental2">Ensino Fundamental - 4º, 5º e 6º ano</Option>
                                <Option value="fundamental3">Ensino Fundamental - 7º, 8º e 9º ano</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item name="porte" label="Porte" rules={rules}>
                            <Select
                            >
                                <Option value="Até 50 matrículas de escolarização">Até 50 matrículas de escolarização</Option>
                                <Option value="Entre 51 e 200 matrículas de escolarização">Entre 51 e 200 matrículas de escolarização</Option>
                                <Option value="Entre 201 e 501 matrículas de escolarização">Entre 201 e 501 matrículas de escolarização</Option>
                                <Option value="Entre 501 e 1000 matrículas de escolarizaçãoual">Entre 501 e 1000 matrículas de escolarização</Option>
                                <Option value="Mais de 1000 matrículas de escolarização">Mais de 1000 matrículas de escolarização</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="número total de alunos"
                            label="Número Total de Alunos"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="número total de docentes"
                            label="Número Total de Docentes"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>
                    </div>

                </div>
            <div className="voltar">
                <Space>
                    <Button className="button2" type="primary" size="large" shape="round" onClick={onClickBack}>
                        Voltar
                    </Button>
                </Space>
            </div>
            <div className="proximo">
                <Space>
                    <Button className="button2" type="primary" size="large" shape="round" htmlType="submit">
                        Cadastrar
                    </Button>
                </Space>
            </div>
            </Form>
        </div>

    )
}