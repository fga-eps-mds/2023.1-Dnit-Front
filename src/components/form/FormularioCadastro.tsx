import { Button, Form, Input, Space} from "antd";
import React from "react";
import "../../styles/App.css";


const CadastroForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="formCadastro">
      <div>
        <h2>Cadastro</h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="Nome Completo" label="Nome Completo" rules={[{ required: true }]}>
              <Input className="input-form" /> 
          </Form.Item>
          <Form.Item name="Email Institucional" label="Email Institucional" rules={[{ required: true }]}>
            <Input className="input-form"/>  
          </Form.Item>
          <Form.Item
<<<<<<< HEAD:src/components/FormularioCadastro.tsx
            name="Senha"
            label="Senha"
=======
            name="confirmPassword"
            label="Confirmar Senha"
>>>>>>> f9374d8ebf45d1002c8df6cfe99a0ad2cfd234a4:src/components/form/FormularioCadastro.tsx
            rules={[{ required: true }]}
          >
            <Input.Password className="input-form" />
          </Form.Item>
          <Form.Item
<<<<<<< HEAD:src/components/FormularioCadastro.tsx
            name="senha"
            label="Confirmar senha"
            rules={[{ required: true }]}
          >
            <Input.Password className="input-form"/>
=======
            name="nome"
            label="Nome Completo"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="uf"
            label="UF de lotação"
            rules={[{ required: true }]}
          >
            <Input />
>>>>>>> f9374d8ebf45d1002c8df6cfe99a0ad2cfd234a4:src/components/form/FormularioCadastro.tsx
          </Form.Item>

          <Form.Item>
            <Space>
<<<<<<< HEAD:src/components/FormularioCadastro.tsx
              <Button  type="primary" htmlType="submit" className="signUpButtonC">
=======
              <Button htmlType="submit" className="signUpButton">
>>>>>>> f9374d8ebf45d1002c8df6cfe99a0ad2cfd234a4:src/components/form/FormularioCadastro.tsx
                <p>Cadastrar-se</p>
              </Button>
            </Space>
          </Form.Item>
          <Form.Item><a href="">Já possui cadastro? Faça o Login</a></Form.Item>
        </Form>
        <a className="politica" href="">Política de privacidade</a><a href=""></a><a className="ajuda" href="">Precisa de Ajuda</a><a href=""></a>
      </div>
    </div>
  );
};

export default CadastroForm;
