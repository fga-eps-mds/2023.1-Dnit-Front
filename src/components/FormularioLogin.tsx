import { Button, Form, Input, Space } from "antd";
import React from "react";
import "../App.css";
import LogoDNIT from "../assets/logoDnitAzul.png";
import ButtonComponent from "../components/Login/buttomComponent"
import { Estilo_Form } from "./consts/formstyle";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


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
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="E-mail" label="E-mail" rules={[{ required: true, message: 'Por favor, preencha o ${name}!' }]} >
            <Input prefix={<i className="fas fa-envelope"></i>} style={Estilo_Form}  />
          </Form.Item>
          <Form.Item name="Senha" label="Senha" rules={[{ required: true, message: 'Por favor, coloque a ${name}!'}]} >
            <Input.Password style={Estilo_Form} prefix={<i className="fas fa-lock"></i>}/>
          </Form.Item>
            <a>Esqueceu a senha?</a>
          <Form.Item>
            <Space>
              <ButtonComponent nome="Entrar" cor="#1351B4" cor_letra="#FFFFFF" cor_borda="#1351B4" largura="25em"></ButtonComponent>
            </Space>
          </Form.Item>
          <a>Não possui cadastro? Cadastrar-se</a>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
