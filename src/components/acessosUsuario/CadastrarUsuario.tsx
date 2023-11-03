import { Form, Input, Radio, Select, Space, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCadastroUsuarioDnit } from "../../service/usuarioApi";
import {fetchUnidadeFederativa} from "../../service/escolaApi";
import "../../styles/form.css";
import { ButtonComponent } from "../Button";

const { Option } = Select;

interface UfProps {
  value: number;
  label: string;
}
const CadastroUsuarioForm: React.FC = () => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const regras = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];

  const [ufVisiveis, setufVisiveis] = useState(false);
  const [empresasVisiveis, setEmpresasVisiveis] = useState(false);
  const [uf, setUf] = useState<UfProps[]>();
  const empresas = [{ label: "Instituto Essência do Saber", value: 0 }];
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const cadastroUsuarioData = {
      email: values.email,
      senha: values.senha,
      nome: values.nome,
      ufLotacao: values.uf,
    };

    try {
      await fetchCadastroUsuarioDnit(cadastroUsuarioData);
      notification.success({ message: "Cadastro feito!" });
      navigate("/login");
    } catch (error) {
      api.error({ message: `Erro ao fazer cadastro` });
    }
  };

  async function fetchUf(): Promise<void> {
    const uf = await fetchUnidadeFederativa();
    const novaUf = uf.map((u) => ({ value: u.id, label: u.nome }));
    setUf(novaUf);
  }

  const handleCustomSubmit = () => {
    form.submit();
  };

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
          onFinish={(event) => {
            void onFinish(event);
          }}
          requiredMark="optional"
          className="form-email"
        >
          <Form.Item name="nome" label="Nome Completo" rules={regras}>
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

          <Form.Item name="senha" label="Senha" rules={regras}>
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

          <Form.Item className="item" name="tipo de usuário" rules={regras}>
            <Radio.Group className="radioButtons" name="tipo de usuário">
              <Radio
                value={"DNIT"}
                checked={ufVisiveis}
                onClick={() => {
                  setufVisiveis(true);
                  setEmpresasVisiveis(false);
                }}
              >
                <p className="radio1">Usuário DNIT</p>
              </Radio>
              <Radio
                value={"Terceirizada"}
                checked={empresasVisiveis}
                onClick={() => {
                  setEmpresasVisiveis(true);
                  setufVisiveis(false);
                }}
              >
                <p className="radio2">Empresa Executora</p>
              </Radio>
            </Radio.Group>
          </Form.Item>

          {ufVisiveis && (
            <Form.Item
              className="ext1 "
              name="uf"
              rules={regras}
              label="UF de Lotação"
            >
              <Select
                onClick={() => {
                  void fetchUf();
                }}
                onMouseDown={() => {
                  void fetchUf();
                }}
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

          {empresasVisiveis && (
            <div>
              <Form.Item
                className="ext2"
                name="empresa executora"
                label="Empresa Executora"
                rules={regras}
              >
                <Select
                  placement="topLeft"
                  optionLabelProp="label"
                  placeholder={<i className="fas fa-city" />}
                >
                  {empresas.map((empresa) => (
                    <Option
                      key={empresa.value}
                      value={empresa.value}
                      label={
                        <>
                          <i className="fas fa-city" />
                          {empresa.label}
                        </>
                      }
                    >
                      {empresa.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          )}

          <Form.Item>
            <Space>
              <ButtonComponent
                label="Cadastrar-se"
                buttonStyle="primary"
                padding="40px"
                onClick={handleCustomSubmit}
              />
            </Space>
          </Form.Item>

          <Link to="/login">Já possui cadastro? Faça o Login</Link>
        </Form>
      </div>
    </div>
  );
};

export default CadastroUsuarioForm;
