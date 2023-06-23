import Header from "../components/Header";
import "../styles/App.css";
import RegS from "../components/form/RegisterEscola";

function RegisterSchool(){
    return(
        <div className="App">
            <Header />
            <div className="Secao2">
                <div className="box">
                <RegS />
                </div>
            </div>
        </div>
    );
}

export default RegisterSchool;