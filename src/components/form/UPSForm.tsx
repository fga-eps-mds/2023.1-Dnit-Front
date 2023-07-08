import React from 'react';
import { Input, Button, Form } from 'antd';
import "../../styles/form/upsForm.css";

const UPSForm: React.FC = () => {
    const [inputLatitude, setInputLatitude] = React.useState('');
    const [inputLongitude, setInputLongitude] = React.useState('');

    const handleInputLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLatitude(event.target.value);
    };

    const handleInputLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLongitude(event.target.value);
    };

    const handleButtonClick = () => {
        console.log("Calcula", inputLatitude, inputLongitude)
    };

    return (
        <>
            <div className='container-formulario'>
                <div className='container-inputs'>
                    <Form.Item name="latitude" label="Latitude">
                        <Input className="inputLatLong" onChange={handleInputLatitude}/>
                    </Form.Item>
                    <Form.Item name="longitude" label="Longitude" >
                        <Input className="inputLatLong" onChange={handleInputLongitude}/>
                    </Form.Item>
                </div>
                <div className='container-botao'>
                    <Button className='button2' onClick={handleButtonClick}>
                        Calcular UPS
                    </Button>
                </div>

            </div>

        </>
    );
};

export default UPSForm;