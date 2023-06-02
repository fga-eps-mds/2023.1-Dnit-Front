import ButtonComponent from "../Button";
// import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, Space, notification, Radio } from "antd";
// import { AuthContext } from "../../provider/Authentication";
import { Link } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import React, { useState } from "react";
import "../../styles/form.css";

const SolicitacaoAcaoForm: React.FC = () => {
  const [form] = Form.useForm();


  const [api, contextHolder] = notification.useNotification();
  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];

  const [visible, setVisible] = useState(false);

  const [visible2, setVisible2] = useState(false);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const cadastroData = {
      escola: values.escola,
      nome: values.nome,
      vinculo: values.vinculo,
      email: values.email,
      telefone: values.telefone,
      ciclos: values.ciclos,
      quatidadede: values.quatidade,
      observacoes: values.observacoes,
    };
  };

return (
  <div className="formc">
    <div>
      <h2>Solicitação ação ao DNIT</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        requiredMark="optional"
        className="form-email"
      >
        <Form.Item name="escola" label="Escola" rules={rules}>
          <Input
            className="inputForm"
          />
        </Form.Item>

          <Form.Item name="nome do solicitante" label="Nome do Solicitante" rules={rules}>
            <Input
              className="inputForm"
            />
          </Form.Item>
          <Form.Item name="vinculo com a escola" label="Vínculo com a Escola" rules={rules}>
            <Input.Password
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="email" label="E-mail" rules={rules}>
            <Input.Password
              className="inputForm"
              prefix={<i className="fas fa-envelope"></i>}
            />
          </Form.Item>
          <Form.Item name="telefone" label="Telefone" rules={rules}>
            <Input.Password
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="ciclo de ensino" label="Ciclos de Ensino" rules={rules}>
            <Input.Password
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="quantidade" label="Quantidade de Alunos" rules={rules}>
            <Input.Password
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="observações" label="Observações" rules={rules}>
            <Input.Password
              className="inputForm"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <ButtonComponent
                nome="Enviar solicitação"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="25em"
              />
            </Space>
          </Form.Item>

        
        </Form>
        <a href="" className="politica" > Política de privacidade </a> <a href="" className="ajuda"> Precisa de ajuda?</a>
      </div>
    </div>
  );
};


export default SolicitacaoAcaoForm;