import { Form, Input, Space, Radio } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoDNIT from "../../assets/logoDnitAzul.png";
import "../../styles/form.css";
import ButtonComponent from "../Button";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

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

  const [visible, setVisible]=useState(false);

  const [visible2, setVisible2]=useState(false);


  return (
    <div className="formc">
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

          <Form.Item className="item" name="tipo de usuário" rules={rules}>
            <Radio.Group className="radioButtons" name="tipo de usuário" >
              <Radio value={"DNIT"} checked={visible} onClick={()=>{setVisible(true);setVisible2(false)}} >
                <p className="radio1">Usuário DNIT</p>
              </Radio>
              <Radio  value={"Terceirizada"} checked={visible2} onClick={()=>{setVisible2(true);setVisible(false)}} >
                <p className="radio2">Empresa Terceirizada</p>
              </Radio>
            </Radio.Group>
          </Form.Item>

          { visible && 
          <div>
          <Form.Item className="ext1" name="uf de lotação" label="UF de Lotação" rules={rules}>
            <Input
              prefix={<i className="fas fa-city"></i>}
              className="inputForm"
            />
          </Form.Item>
          </div>
          } 

          { visible2 && 
          <div>
            <Form.Item className="ext2" name="empresa executora" label="Empresa Executora" rules={rules}>
            <Input
              prefix={<i className="fas fa-city"></i>}
              className="inputForm"
            />
          </Form.Item>
          </div>
          } 

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

          <Link  to="/login">Já possui cadastro? Faça o Login</Link>
        </Form>
        <a href="" className="politica" > Política de privacidade </a> <a href="" className="ajuda"> Precisa de ajuda?</a>
      </div>
    </div>
  );
};


export default CadastroForm;
