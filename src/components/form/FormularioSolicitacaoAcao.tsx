import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Button, Form, Input, Space, notification, Select } from "antd";
import { Link } from "react-router-dom";
import ButtonComponent from "../Button";
import "../../styles/form.css";
import { fetchSchoolByName } from "../../service/inepAPI";
import { inepSchoolsUrl } from "../../consts/service";

const { Option } = Select;



const SolicitacaoAcaoForm: React.FC = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [data, loadingData, setAPIURL] = useApi();

  const getSchools = async (name: string) => {

    setAPIURL(`${inepSchoolsUrl}?nome=${name}`)
    // setAPIURL("http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?situacaoFuncionamento=1&energiaInexistente=on&aguaInexistente=on&esgotoInexistente=on&cozinha=on")


  }



  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const cadastroData = {
      escola: values.escola,
      nome: values.nome,
      vinculo: values.vinculo,
      email: values.email,
      telefone: values.telefone,
      ciclos: values.ciclos,
      quantidade: values.quantidade,
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

            <Select
              placeholder="Selecione uma escola"
              className="inputForm form-item-select"
              onSearch={(value) => {
                // alert({value})

                console.log(value)
                getSchools(value);

              }}
              // onChange
              showSearch

            >
              <Option value="escola1">Escola 1</Option>
              <Option value="escola2">Escola 2 </Option>
              <Option value="escola3">Escola 3 </Option>
              <Option value="escola4">Escola 4</Option>


            </Select>
          </Form.Item>

          <Form.Item name="nome do solicitante" label="Nome do Solicitante" rules={rules}>
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item name="vinculo com a escola" label="Vínculo com a Escola" rules={rules}>
            <Select
              placeholder="Selecione uma escola"
              className="inputForm form-item-select"
            >
              <Option value="escola1">Professor</Option>
              <Option value="escola2">Gestor escolar</Option>
              <Option value="escola3">Estudante</Option>
              <Option value="escola4">Outro</Option>


            </Select>
          </Form.Item>

          <Form.Item name="email" label="E-mail" rules={rules}>
            <Input
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="telefone" label="Telefone" rules={rules}>
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item name="ciclos de ensino" label="Ciclos de Ensino" rules={rules}>
            <Select
              mode="multiple"
              placeholder="Selecione uma escola"
              className="inputForm form-item-select"
            >
              <Option value="infantil">Ensino Infantil</Option>
              <Option value="fundamental1">Ensino Fundamental - 1º, 2º e 3º ano</Option>
              <Option value="fundamental2">Ensino Fundamental - 4º, 5º e 6º ano</Option>
              <Option value="fundamental3">Ensino Fundamental - 7º, 8º e 9º ano</Option>
            </Select>
          </Form.Item>

          <Form.Item name="quantidade de alunos" label="Quantidade de Alunos" rules={rules}>
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item name="observacoes" label="Observações">
            <Input className="inputForm" />
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
        <a href="" className="politica">Política de privacidade</a>
        <a href="" className="ajuda">Precisa de ajuda?</a>
      </div>
    </div>
  );
};

export default SolicitacaoAcaoForm;

