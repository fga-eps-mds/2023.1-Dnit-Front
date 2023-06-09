import ButtonComponent from "../Button";
// import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Radio, Select, Space, notification } from "antd";
// import { AuthContext } from "../../provider/Authentication";
import fetchCadastro from "../../service/register";
// import LogoDNIT from "../../assets/logoDnitAzul.png"

import React, { useState } from "react";
import { Link } from "react-router-dom";
import fetchUnidadeFederativa from "../../service/federativeUnit";
import "../../styles/form.css";
const { Option } = Select;

interface UfProps {
  value: number;
  label: string;
}
const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];

  const [visibleRadioUF, setVisibleRadioUF] = useState(false);
  const [visibleRadioCompanies, setVisibleRadioCompanies] = useState(false);
  const [uf, setUf] = useState<UfProps[]>();
  const companies = [{ label: "Instituto Essência do Saber", value: 0 }];

  const onFinish = async (values: any) => {
    const registerData = {
      email: values.email,
      senha: values.senha,
      nome: values.nome,
      uf: 27,
    };

    try {
      await fetchCadastro(registerData);
      api.success({ message: "Cadastro feito!" });
      // login();
    } catch (error) {
      api.error({ message: `Erro ao fazer cadastro` });
    }
  };

  async function fetchUf() {
    const uf = await fetchUnidadeFederativa();
    const newuf = uf.map((u) => ({ value: u.id, label: u.descricao }));
    setUf(newuf);
  }

  return (
    <div className="formc">
      {contextHolder}
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
          <Form.Item name="nome" label="Nome Completo" rules={rules}>
            <Input
              className="inputForm"
              prefix={<i className="fas fa-user"></i>}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail Institucional"
            rules={[
              {
                required: true,
                message: "Por favor, preencha o campo email!",
              },
              {
                type: "email",
                message: "O email não é válido",
              },
            ]}
          >
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

          <Form.Item
            name="confirmar senha"
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

          <Form.Item className="item" name="tipo de usuário" rules={rules}>
            <Radio.Group className="radioButtons" name="tipo de usuário">
              <Radio
                value={"DNIT"}
                checked={visibleRadioUF}
                onClick={() => {
                  setVisibleRadioUF(true);
                  setVisibleRadioCompanies(false);
                }}
              >
                <p className="radio1">Usuário DNIT</p>
              </Radio>
              <Radio
                value={"Terceirizada"}
                checked={visibleRadioCompanies}
                onClick={() => {
                  setVisibleRadioCompanies(true);
                  setVisibleRadioUF(false);
                }}
              >
                <p className="radio2">Empresa Executora</p>
              </Radio>
            </Radio.Group>
          </Form.Item>

          {visibleRadioUF && (
            <Form.Item
              className="ext1 "
              name="uf de lotação"
              rules={rules}
              label="UF de Lotação"
            >
              <Select
                onClick={fetchUf}
                onMouseDown={fetchUf}
                notFoundContent={<p>Carregando...</p>}
                placement="topLeft"
                optionLabelProp="label"
                placeholder={<i className="fas fa-city" />}
              >
                {uf?.map((u) => (
                  <Option
                    data-testid={`option-${u.value}`}
                    key={u.value}
                    value={u.value}
                    label={
                      <>
                        <i className="fas fa-city" />
                        {u.label}
                      </>
                    }
                  >
                    {u.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {visibleRadioCompanies && (
            <div>
              <Form.Item
                className="ext2"
                name="empresa executora"
                label="Empresa Executora"
                rules={rules}
              >
                <Select
                  placement="topLeft"
                  optionLabelProp="label"
                  placeholder={<i className="fas fa-city" />}
                >
                  {companies.map((company) => (
                    <Option
                      key={company.value}
                      value={company.value}
                      label={
                        <>
                          <i className="fas fa-city" />
                          {company.label}
                        </>
                      }
                    >
                      {company.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          )}

          <Form.Item>
            <Space>
              <ButtonComponent
                nome="Cadastrar-se"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="10em"
              />
            </Space>
          </Form.Item>

          <Link to="/login">Já possui cadastro? Faça o Login</Link>
        </Form>
        <a href="" className="politica">
          {" "}
          Política de privacidade{" "}
        </a>{" "}
        <a href="" className="ajuda">
          {" "}
          Precisa de ajuda?
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
