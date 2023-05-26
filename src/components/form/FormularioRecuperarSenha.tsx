import { Form, Input, Space } from "antd";
import React from "react";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import "../../styles/form.css";
import ButtonComponent from "../Button";

const RecuperarSenhaForm: React.FC = () => {
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
        <h2><strong> Recuperar Senha </strong></h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="Nova Senha" label="Nova Senha" rules={rules}>
            <Input.Password
              prefix={<i className="fas fa-lock"></i>}
              className="inputForm"
            />
          </Form.Item>
          <Form.Item name="Confirmar Senha" label="Confirmar Senha" rules={rules}>
            <Input.Password
              className="inputForm"
              prefix={<i className="fas fa-lock"></i>}
            />
          </Form.Item>
          <Form.Item className="recuperarsenha">
            <Space>
              <ButtonComponent
                nome="Confirmar"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="10em"
              />
            </Space>
          </Form.Item>
          </Form>
      </div>
    </div>
  );
};

export default RecuperarSenhaForm;
