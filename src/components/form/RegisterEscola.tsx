import "../../styles/form.css";
import { Button, Form, Input, Radio, Select, Space, notification } from "antd";
import ButtonComponent from "../Button";



export default function RegS() {
return(
    <div className="formrs">
        <div>
            <h2>Escolha como cadastrar</h2>
            <Form>
            <Form.Item className="insbutton" >
                <Space>
                <Button className="button1" type="primary" size="large" shape="round">
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

    </div>
);
}



