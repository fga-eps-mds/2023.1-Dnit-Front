import { Form, Input, Space, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import fetchResetPassword from "../../service/resetPW";
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
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const searchParams = new URLSearchParams(document.location.search);
    const uuid = searchParams.get("token");

    const recoverData = {
      uuidAutenticacao: uuid ?? "",
      senha: values.senha,
      nome: "",
      email: "",
    };

    try {
      await fetchResetPassword(recoverData);
      api.success({ message: "Senha alterada!" });
      navigate("/login");
    } catch {
      api.error({ message: `Erro ao alterar senha` });
    }
  };

  return (
    <div className="form">
      {contextHolder}
      <img className="logoDnit" src={LogoDNIT} alt="Logo DNIT" />
      <div>
        <h2>
          <strong> Redefinir Senha </strong>
        </h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="senha" label="Nova Senha" rules={rules}>
            <Input.Password
              prefix={<i className="fas fa-lock"></i>}
              className="inputForm"
            />
          </Form.Item>
          <Form.Item
            name="confirmarSenha"
            label="Confirmar Senha"
            rules={[
              { required: true, message: "Por favor, preencha o campo senha!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("senha") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("As senhas devem ser iguais")
                  );
                },
              }),
            ]}
          >
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
