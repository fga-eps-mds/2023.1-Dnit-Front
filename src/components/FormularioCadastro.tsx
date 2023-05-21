import {
  Form,
  Input,
} from 'antd';
import React from 'react';

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const CadastroForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  return (
    <Form
      
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >

        <Form.Item 
            name="nome"
            label="Nome Completo"
            tooltip="Seu nome completo!"
            rules={[{ required: true, message: 'Por favor, coloque seu nome completo!', whitespace: true }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'Entrada inválida!',
            },
            {
                required: true,
                message: 'Por favor, coloque o seu e-mail!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="senha"
            label="Senha"
            rules={[
            {
                required: true,
                message: 'Por favor, coloque a sua senha!',
            },
            ]}
            hasFeedback
        >
        <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirmar"
            label="Confirmar Senha"
            dependencies={['senha']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Por favor, confirme a senha!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('senha') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
                },
            }),
            ]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item 
            name="uflotacao"
            label="UF de Lotação"
            rules={[{ required: true, message: 'Por favor, coloque sua UF de Lotação!', whitespace: true }]}
        >
        <Input />
        </Form.Item>

    </Form>
  );
};

export default CadastroForm;



