import Header from "../components/Header";
import "../styles/App.css";
import RegS from "../components/form/RegisterEscola";
import { FiltroProvider } from "../context/FiltroTabela";

function RegisterSchool(){
    return(
        <div className="App">
            <Header />
            <div className="Secao2">
                <div className="box">
                <FiltroProvider>
                <RegS />
                </FiltroProvider>
                </div>
            </div>
        </div>
    );
}

export default RegisterSchool;