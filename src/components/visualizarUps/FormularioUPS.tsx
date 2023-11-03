import { Button, Form, Input, Spin } from "antd";
import React from "react";
import {fetchCalculaUps} from "../../service/upsApi";
import "../../styles/form/upsForm.css";

const UPSForm: React.FC = () => {
  const [form] = Form.useForm();
  const [entradaLatitude, setEntradaLatitude] = React.useState("");
  const [entradaLongitude, setEntradaLongitude] = React.useState("");
  const [valorUpsGeral, setValorUpsGeral] = React.useState<number | undefined>(
    undefined
  );
  const [valorUps2018, setValorUps2018] = React.useState<number | undefined>(
    undefined
  );
  const [valorUps2019, setValorUps2019] = React.useState<number | undefined>(
    undefined
  );
  const [valorUps2020, setValorUps2020] = React.useState<number | undefined>(
    undefined
  );
  const [valorUps2021, setValorUps2021] = React.useState<number | undefined>(
    undefined
  );
  const [valorUps2022, setValorUps2022] = React.useState<number | undefined>(
    undefined
  );
  const [carregando, setCarregando] = React.useState(false);

  const handleEntradaLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntradaLatitude(event.target.value);
  };

  const handleEntradaLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntradaLongitude(event.target.value);
  };

  const handleButtonClick = async () => {
    setCarregando(true);
    const upsData = {
      latitude: Number(entradaLatitude),
      longitude: Number(entradaLongitude),
    };

    try {
      const retorno = await fetchCalculaUps(upsData);
      setCarregando(false);
      setValorUpsGeral(retorno.upsGeral);
      setValorUps2018(retorno.ups2018);
      setValorUps2019(retorno.ups2019);
      setValorUps2020(retorno.ups2020);
      setValorUps2021(retorno.ups2021);
      setValorUps2022(retorno.ups2022);
    } catch (error) {
      setCarregando(false);
      setValorUpsGeral(undefined);
      setValorUps2018(undefined);
      setValorUps2019(undefined);
      setValorUps2020(undefined);
      setValorUps2021(undefined);
      setValorUps2022(undefined);
    }
  };

  const rulesLatitude = [
    {
      required: true,
      pattern: /^-?([1-8]?\d|90)(\.\d{1,15})?$/,
      message: "Valores entre -90 e +90, até 15 decimais, utilizando ponto!",
    },
  ];

  const rulesLongitude = [
    {
      required: true,
      pattern: /^-?((1?[0-7]|[0-9])?\d|180)(\.\d{1,15})?$/,
      message: "Valores entre -180 e +180, até 15 decimais, utilizando ponto!",
    },
  ];

  return (
    <>
      <div>
        <Form
          form={form}
          onFinish={handleButtonClick}
          className="container-formulario"
        >
          <div className="container-inputs">
            <Form.Item
              name="latitude"
              label="Latitude"
              rules={rulesLatitude}
              labelCol={{ span: 24 }}
            >
              <Input className="inputLatLong" onChange={handleEntradaLatitude} />
            </Form.Item>
            <Form.Item
              name="longitude"
              label="Longitude"
              rules={rulesLongitude}
              labelCol={{ span: 24 }}
            >
              <Input className="inputLatLong" onChange={handleEntradaLongitude} />
            </Form.Item>
          </div>
          <div className="container-botao">
            <Button className="button2" htmlType="submit">
              Calcular UPS
            </Button>
          </div>
        </Form>
        {carregando ? (
          <Spin style={{ paddingTop: "20px" }} data-testid="spin" />
        ) : (
          valorUpsGeral !== undefined && (
            <div className="container-retorno">
              <h3 className="ups-retornoGeral">UPS Geral: {valorUpsGeral}</h3>
              <p className="ups-retorno">UPS 2022: {valorUps2022}</p>
              <p className="ups-retorno">UPS 2021: {valorUps2021}</p>
              <p className="ups-retorno">UPS 2020: {valorUps2020}</p>
              <p className="ups-retorno">UPS 2019: {valorUps2019}</p>
              <p className="ups-retorno">UPS 2018: {valorUps2018}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default UPSForm;
