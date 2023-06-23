import { Button, Form, Input, Select, Space } from "antd";
import { useState } from "react";
import fetchUnidadeFederativa from "../../../service/federativeUnit";
const { Option } = Select;
interface Step2Props {
    onClickBack: () => void
}
interface UfProps {
    value: number;
    label: string;
}

export default function Step2({ onClickBack }: Step2Props) {
    
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: "Preencha o campo ${name}!",
        },
    ];
    
    const [uf, setUf] = useState<UfProps[]>();
    
    
    
    async function fetchUf() {
        const uf = await fetchUnidadeFederativa();
        const newuf = uf.map((u) => ({ value: u.id, label: u.descricao }));
        setUf(newuf);
        
    }


    const onFinish = async (values: any) => {
        console.log("OK");
    
    };
    return (

        <div>
            <h2>Cadastrar Escola</h2>
            <Form
                form={form}
                onFinish={onFinish}
                name="form2"
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                className="form-email"
                preserve
            >
                <div className="divScroll">
                    <div className="bloco">
                        <Form.Item name="nome da escola" label="Nome da Escola" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="rede" label="Rede" rules={rules}>
                            <Select
                            >
                                <Option value="Municipal">Municipal</Option>
                                <Option value="Estadual">Estadual</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="codigo da escola" label="Codigo da Escola" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="uf"
                            rules={rules}
                            label="UF"
                        >

                            <Select
                                onClick={fetchUf}
                                notFoundContent={<p>Carregando...</p>}
                                placement="bottomRight"
                                optionLabelProp="label"
                                className="uf"
                            >
                                {uf?.map((u) => (
                                    <Option
                                        key={u.value}
                                        value={u.value}
                                        label={
                                            <>
                                                {u.label}
                                            </>
                                        }
                                    >
                                        {u.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="cep"
                            label="CEP"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

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

                    </div>
                    <div className="bloco2">
                        <Form.Item name="endereço" label="Endereço" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="município"
                            label="Município"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="localização" label="Localização" rules={rules}>
                            <Select
                            >
                                <Option value="Rural">Rural</Option>
                                <Option value="Urbana">Urbana</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="longitude"
                            label="Longitude"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
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
                        <Button className="button2" type="primary" size="large" htmlType="submit" shape="round">
                            Cadastrar
                        </Button>
                    </Space>
                </div>
            </Form>

        </div>
    )
}