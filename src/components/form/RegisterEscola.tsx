import "../../styles/form.css";
import { Button, Form, Input, Radio, Select, Space, notification } from "antd";
import ButtonComponent from "../Button";
import { useState } from "react";
import { link } from "fs";




export default function RegS() {

const [screen, setScreen] = useState<"form1"|"form2"|"form3">("form1");

return(
    <div className="formrs">
        {screen === "form1" && (
            <div>
            <h2>Escolha como cadastrar</h2>
            <Form>
            <Form.Item className="insbutton" >
                <Space>
                <Button className="button1" type="primary" size="large" shape="round" onClick={() => setScreen("form2")}>
                Inserindo informações
                </Button>
                </Space>
          </Form.Item>
          <Form.Item className="insbutton">
                <Space>
                <Button className="button1" type="primary" size="large" shape="round">
                Utilizando Arquivo CSV
                </Button>
                </Space>
            </Form.Item>

          </Form>
          </div>
        )}

        {screen === "form2" && (
            <div>
            <h2>Cadastrar Escola</h2>
                    <Form.Item className="insbutton">
                    <Space>
                    <Button className="button1" type="primary" size="large" shape="round" onClick={() => setScreen("form1")}>
                    Voltar
                    </Button>
                    </Space>
                    </Form.Item>
            </div>
        )}
    </div>
);
}




