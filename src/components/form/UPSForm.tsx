import React from 'react';
import { Input, Button, Form } from 'antd';
import "../../styles/form/upsForm.css";
import fetchCalcularUps from '../../service/calcularUps';
import { CalcularUpsData } from '../../models/service';

const UPSForm: React.FC = () => {
    const [form] = Form.useForm();
    const [inputLatitude, setInputLatitude] = React.useState('');
    const [inputLongitude, setInputLongitude] = React.useState('');

    const handleInputLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLatitude(event.target.value);
    };

    const handleInputLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLongitude(event.target.value);
    };

    const handleButtonClick = async () => {
        const upsData = {
            latitude: Number(inputLatitude),
            longitude: Number(inputLongitude)
        };
        console.log("Entrando no try")
        try {
            console.log("Entrando no await")
            await fetchCalcularUps(Number(inputLatitude), Number(inputLongitude))
        } catch (error) { }
        console.log("Calcula", inputLatitude, inputLongitude)
    };

    const rulesLatitude = [
        {
            required: true,
            pattern: /^-?([1-8]?\d|90)(\.\d{1,7})?$/,
            message:
                "Valores entre -90 e +90, até 7 decimais, utilizando ponto!",
        },
    ];

    const rulesLongitude = [
        {
            required: true,
            pattern: /^-?((1?[0-7]|[0-9])?\d|180)(\.\d{1,7})?$/,
            message:
                "Valores entre -180 e +180, até 7 decimais, utilizando ponto!",
        },
    ];

    return (
        <>
            <div >
                <Form
                    form={form}
                    onFinish={handleButtonClick}
                    className='container-formulario'>
                    <div className='container-inputs'>
                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={rulesLatitude}
                            labelCol={{ span: 24 }}>
                            <Input className="inputLatLong" onChange={handleInputLatitude} />
                        </Form.Item>
                        <Form.Item
                            name="longitude"
                            label="Longitude"
                            rules={rulesLongitude}
                            labelCol={{ span: 24 }}>
                            <Input className="inputLatLong" onChange={handleInputLongitude} />
                        </Form.Item>
                    </div>
                    <div className='container-botao'>
                        <Button className='button2' htmlType='submit'>
                            Calcular UPS
                        </Button>
                    </div>
                </Form>

            </div>

        </>
    );
};

export default UPSForm;