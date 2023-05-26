import { Form, Input, Space, Radio } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import "../../styles/form.css";
import ButtonComponent from "../Button";

const CadastroForm: React.FC = () => {
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
      <div>
        <h2>Cadastro</h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="nome completo" label="Nome Completo" rules={rules}>
            <Input
              className="inputForm"
              prefix={<i className="fas fa-user"></i>}
            />
          </Form.Item>

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

          <Form.Item name="confirmar senha" label="Confirmar Senha" rules={rules}>
            <Input.Password
              className="inputForm"
              prefix={<i className="fas fa-lock"></i>}
            />  
          </Form.Item>

          <Form.Item>
            <Radio.Group  defaultValue={false}>
              <Radio name="Usuário DNIT" value={true} >
                <p className="radio1">Usuário DNIT</p>
              </Radio>
              <Radio defaultChecked value={false}>
                <p className="radio2">Empresa Executora</p></Radio>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <ButtonComponent
                nome="Cadastrar-se"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="25em"
              />
            </Space>
          </Form.Item>

          <Link to="/login">Já possui cadastro? Faça o Login</Link>
        </Form>
        <a href="" className="politica" > Política de privacidade </a> <a href="" className="ajuda"> Precisa de ajuda?</a>
      </div>
    </div>
  );
};

export default CadastroForm;
