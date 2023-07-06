import { useState } from 'react';
import '../../styles/form.css';
import { Form } from 'antd';
import Step1 from './Steps/Step1/Step1';
import Step1_Aceito from './Steps/Step1/Step1Aceito';
import { Link, useNavigate } from 'react-router-dom';


function RegistrarRodovias() {
    const [screen, setScreen] = useState<"form1" | "form2" | "form3">("form1");
    const returnPage = useNavigate();
    return (
        <div className='form'>
            <Form.Provider>
                {screen === "form1" && (
                    <Step1 onClickAceito={() => {setScreen('form2')}} onClickBack={() => returnPage('/escolas-cadastradas')} onClickErroJaCadastrada={} onClickError={}></Step1>
                )}
                {screen === "form2" && (
                    <Step1_Aceito onClickVoltar={() => returnPage('/escolas-cadastradas')}/>
                )}
            </Form.Provider>
        </div>
    );
}
export default RegistrarRodovias;