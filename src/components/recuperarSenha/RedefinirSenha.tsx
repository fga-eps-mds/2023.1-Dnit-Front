import { Form, Input, Space, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import {fetchRedefineSenha} from "../../service/usuarioApi";
import "../../styles/form.css";
import { ButtonComponent } from "../Button";

const RedefinirSenha: React.FC = () => {
  const [formulario] = Form.useForm();
  const regras = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleSubmit = () => {
    formulario.submit();
  };

  const onFinish = async (values: any) => {
    const parametrosPesquisa = new URLSearchParams(document.location.search);
    const uuid = parametrosPesquisa.get("token");

    const redefinirSenhaData = {
      uuidAutenticacao: uuid ?? "",
      senha: values.senha,
      nome: "",
      email: "",
    };

    try {
      await fetchRedefineSenha(redefinirSenhaData);
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
          form={formulario}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="senha" label="Nova Senha" rules={regras}>
            <Input.Password
              prefix={<i className="fas fa-lock"></i>}
              className="inputForm"
            />
          </Form.Item>
          <Form.Item
            rules={[
              ({ getFieldValue }) => ({
                validator(_, fieldValue) {
                  if (!fieldValue || getFieldValue("senha") === fieldValue) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("As senhas devem ser iguais")
                  );
                },
              }),
              { required: true, message: "Por favor, preencha o campo senha!" },
            ]}
            label="Confirmar Senha"
            name="confirmarSenha"
          >
            <Input.Password
              className="inputForm"
              prefix={<i className="fas fa-lock"></i>}
            />
          </Form.Item>
          <Form.Item className="recuperarsenha">
            <Space>
              <ButtonComponent
                label="Confirmar"
                buttonStyle="primary"
                padding="40px"
                onClick={handleSubmit}
              />
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RedefinirSenha;
