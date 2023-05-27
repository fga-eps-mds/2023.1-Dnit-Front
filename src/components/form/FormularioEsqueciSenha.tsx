import { Form, Input, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import "../../styles/form.css";
import ButtonComponent from "../Button";

const EsqueciSenhaForm: React.FC = () => {
  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="form">
      <img className="logoDnit" src={LogoDNIT} alt="Logo DNIT" />
      <div>
        <h2>Recuperar Senha</h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="email" label="E-mail" rules={rules}>
            <Input
              prefix={<i className="fas fa-envelope"></i>}
              className="inputForm"
            />
          </Form.Item>
          <Form.Item name="senha" label="Senha" rules={rules}>
            <Input.Password
              className="inputForm"
              prefix={<i className="fas fa-lock"></i>}
            />
          </Form.Item>
          <a>Esqueceu a senha?</a>
          <Form.Item>
            <Space>
              <ButtonComponent
                nome="Entrar"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="10em"
              />
            </Space>
          </Form.Item>
          <Link to="/cadastro">Não possui cadastro? Cadastrar-se</Link>
        </Form>
      </div>
    </div>
  );
};

export default EsqueciSenhaForm;
