import { Form, Input, notification, Space } from "antd";
import React from "react";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import {fetchRecuperaSenha} from "../../service/usuarioApi";
import "../../styles/form.css";
import { ButtonComponent } from "../Button";

const EsqueciSenhaForm: React.FC = () => {
  const [formulario] = Form.useForm();
  const regras = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values: any) => {
    const recuperarSenhaData = {
      email: values.email,
      nome: "",
      senha: "",
    };

    try {
      await fetchRecuperaSenha(recuperarSenhaData);
      api.success({ message: "Link de recuperação enviado ao email!" });
    } catch {
      api.error({ message: `Erro ao enviar link de recuperação` });
    }
  };

  const handleCustomSubmit = () => {
    formulario.submit();
  };

  return (
    <div className="form">
      {contextHolder}
      <img className="logoDnit" src={LogoDNIT} alt="Logo DNIT" />
      <div>
        <h2>
          <strong>Recuperar Senha</strong>
        </h2>
        <Form
          form={formulario}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="email" label="Email" rules={regras}>
            <Input
              prefix={<i className="fas fa-envelope"></i>}
              className="inputForm"
            />
          </Form.Item>
          <Form.Item className="esqueci">
            <Space>
              <ButtonComponent
                label="Enviar Link de Recuperação"
                buttonStyle="primary"
                padding="40px"
                onClick={handleCustomSubmit}
              />
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EsqueciSenhaForm;
