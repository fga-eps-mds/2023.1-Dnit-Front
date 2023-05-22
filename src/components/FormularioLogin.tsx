import { Button, Form, Input, Space } from "antd";
import React from "react";
import "../App.css";
import LogoDNIT from "../assets/logoDnitAzul.png";

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="form">
      <img className="logoDnit" src={LogoDNIT} alt="Logo DNIT" />
      <div>
        <h2>Login</h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <p>Esqueceu a senha?</p>
          <Form.Item>
            <Space>
              <Button htmlType="reset" className="signUpButton">
                <p>Cadastrar-se</p>
              </Button>
              <Button type="primary" htmlType="submit" className="loginButton">
                <p>Entrar</p>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
