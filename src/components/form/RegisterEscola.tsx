import "../../styles/form.css";
import { Button, Form, Input, Radio, Select, Space, notification } from "antd";
import ButtonComponent from "../Button";
import { useState } from "react";
//import { link } from "fs";




export default function RegS() {
const [form] = Form.useForm();
const rules = [
    {
        required: true,
        message: "Preencha o campo ${name}!",
    },
];
    
const [screen, setScreen] = useState<"form1"|"form2"|"form3">("form1");
return(
    <div className="formrs">
        {screen === "form1" && (
            <div className="form1">
            <h2>Escolha como cadastrar</h2>
            <Form>
            <Form.Item className="insbutton" >
                <Space>
                <Button className="button1" type="primary" size="large" shape="round" onClick={() => setScreen("form2")}>
                Inserindo informações
                </Button>
                </Space>
          </Form.Item>
          <Form.Item className="insbutton">
                <Space>
                <Button className="button1" type="primary" size="large" shape="round">
                Utilizando Arquivo CSV
                </Button>
                </Space>
            </Form.Item>

          </Form>
        </div>
        )}

        {screen === "form2" && (
        <div>
        <h2>Cadastrar Escola</h2>
                <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                className="form-email"
                >
                <div>
                    <div className="bloco">
                        <Form.Item name="nome da escola" label="Nome da Escola" rules={rules}>
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="rede"
                            label="Rede"
                            rules = {rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item name="codigo da escola" label="Codigo da Escola" rules={rules}>
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="uf"
                            label="UF"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="cep"
                            label="CEP"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>
                    </div>
                    <div className="bloco2">
                        <Form.Item name="endereço" label="Endereço" rules={rules}>
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="município"
                            label="Município"
                            rules = {rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item name="localização" label="Localização" rules={rules}>
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="longitude"
                            label="Longitude"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>
                    </div>
                </div>
                </Form>

                <div className="voltar">
                    <Space>
                    <Button className="button2" type="primary" size="large" shape="round" onClick={() => setScreen("form1")}>
                    Voltar
                    </Button>
                    </Space>
                </div>
                <div className="proximo">
                    <Space>
                    <Button className="button2" type="primary" size="large" shape="round" onClick={() => setScreen("form3")}>
                    Próximo
                    </Button>
                    </Space>
                </div>
        </div>
        )}


        {screen === "form3" && (
            <div>
                <h2>Informações Adicionais</h2>
                <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                className="form-email"
                >
                <div>
                    <div className="bloco3">
                        <Form.Item name = "telefone" label = "Telefone" rules = {rules}>
                            <Input
                            className = "inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="etapas de ensino"
                            label="Etapas de Ensino"
                            rules = {rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item name="porte" label="Porte" rules={rules}>
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="número total de alunos"
                            label="Número Total de Alunos"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="número total de docentes"
                            label="Número Total de Docentes"
                            rules={rules}
                            >
                            <Input
                            className="inputForm"
                            />
                        </Form.Item>
                    </div>
                    
                </div>
                </Form>
                <div className="voltar">
                    <Space>
                    <Button className="button2" type="primary" size="large" shape="round" onClick={() => setScreen("form2")}>
                    Voltar
                    </Button>
                    </Space>
                </div>
                <div className="proximo">
                    <Space>
                    <Button className="button2" type="primary" size="large" shape="round">
                    Cadastrar
                    </Button>
                    </Space>
                </div>
            </div>
        )}
    </div>
);
}



