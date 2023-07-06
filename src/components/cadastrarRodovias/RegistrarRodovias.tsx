import { useState } from 'react';
import '../../styles/form.css';
import { Form } from 'antd';
import Step1_Rodovias from '../form/Steps/Step1_Rodovias';
import Step2_Rodovias_Aceito from '../form/Steps/Step2_Rodovias_Aceito';
import Step3_Rodovias_erro from '../form/Steps/Step3_Rodovias_erro1';
import { Link, useNavigate } from 'react-router-dom';


function RegistrarRodovias() {
    const [screen, setScreen] = useState<"form1" | "form2" | "form3">("form1");
    const returnPage = useNavigate();
    return (
        <div className='form'>
            <Form.Provider>
                {screen === "form1" && (
                    <Step1_Rodovias onClickAceito={() => { setScreen('form2') }}
                        onClickErroTamanho={() => setScreen("form3")} onClickBack={() => returnPage('/escolas-cadastradas')}  ></Step1_Rodovias>
                )}
                {screen === "form2" && (
                    <Step2_Rodovias_Aceito onClickVoltar={() => returnPage('/escolas-cadastradas')} />
                )}
                {screen === "form3" && (
                    <Step3_Rodovias_erro onClickVoltar={() => setScreen('form1')} />
                )}
            </Form.Provider>
        </div>
    );
}
export default RegistrarRodovias;