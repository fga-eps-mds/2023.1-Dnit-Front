import { Button, Form, Input, Select, Space, notification } from "antd";
import { useState } from "react";
import fetchUnidadeFederativa from "../../../service/federativeUnit";
import fetchCadastroEscola from "../../../service/registerSchool";





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
    const [api, contextHolder] = notification.useNotification();
    const rules = [
        {
            required: true,
            message: "Preencha o campo ${label}!",
        },
    ];

    const [uf, setUf] = useState<UfProps[]>();
    
    async function fetchUf() {
        const uf = await fetchUnidadeFederativa();
        const newuf = uf.map((u) => ({ value: u.id, label: u.descricao }));
        setUf(newuf);
        
    }


    const onFinish = async (values: any) => {
        const registerSchoolData = {
            NomeEscola: values.nome,
            IdRede: 1,
            CodigoEscola: values.codigo,
            IdUf: 27,
            Cep: values.cep,
            Telefone: values.telefone,
            IdEtapasDeEnsino: 1,
            IdPorte: 1,
            Endereco: values.endereco,
            IdMunicipio: 1,
            IdLocalizacao: 1,
            Longitude: values.longitude,
            Latitude: values.latitude,
            NumeroTotalAlunos: values.numeroAlunos,
            NumeroTotalDocentes: values.numeroDocentes
        };
        
        try {
            await fetchCadastroEscola(registerSchoolData);
            api.success({ message: "Cadastro feito!" });
          } catch (error) {
            api.error({ message: "Erro ao fazer o cadastro" });
          }
    
    };
    return (

        <div>
        {contextHolder}
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
                        <Form.Item name="nome" label="Nome da Escola" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="rede" label="Rede" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Municipal</Option>
                                <Option value={2}>Estadual</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="codigo" label="Codigo da Escola" rules={rules}>
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

                        <Form.Item name="ciclos" label="Ciclos de Ensino" rules={rules}>
                            <Select
                                mode="multiple"
                            >

                                <Option value={1}>Ensino Infantil</Option>
                                <Option value={2}>Ensino Fundamental - 1º, 2º e 3º ano</Option>
                                <Option value={3}>Ensino Fundamental - 4º, 5º e 6º ano</Option>
                                <Option value={4}>Ensino Fundamental - 7º, 8º e 9º ano</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item name="porte" label="Porte" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Até 50 matrículas de escolarização</Option>
                                <Option value={2}>Entre 51 e 200 matrículas de escolarização</Option>
                                <Option value={3}>Entre 201 e 501 matrículas de escolarização</Option>
                                <Option value={4}>Entre 501 e 1000 matrículas de escolarização</Option>
                                <Option value={5}>Mais de 1000 matrículas de escolarização</Option>

                            </Select>
                        </Form.Item>

                    </div>
                    <div className="bloco2">
                        <Form.Item name="endereco" label="Endereço" rules={rules}>
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="municipio"
                            label="Município"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item name="localizacao" label="Localização" rules={rules}>
                            <Select
                            >
                                <Option value={1}>Rural</Option>
                                <Option value={2}>Urbana</Option>
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
                            name="númeroAlunos"
                            label="Número Total de Alunos"
                            rules={rules}
                        >
                            <Input
                                className="inputForm2"
                            />
                        </Form.Item>

                        <Form.Item
                            name="númeroDocentes"
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