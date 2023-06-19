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

    const [uf, setUf] = useState<UfProps[]>();



    async function fetchUf() {
        const uf = await fetchUnidadeFederativa();
        const newuf = uf.map((u) => ({ value: u.id, label: u.descricao }));
        setUf(newuf);
    }

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
                <div>
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
                            Próximo
                        </Button>
                    </Space>
                </div>
            </Form>

        </div>
    )
}