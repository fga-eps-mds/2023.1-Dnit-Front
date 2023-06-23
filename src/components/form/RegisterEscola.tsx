import "../../styles/form.css";
import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Setp3";
import { Form } from "antd";
export default function RegS() {

    const [screen, setScreen] = useState<"form1" | "form2" | "form3">("form1");
    return (
        <div className="formrs">

            <Form.Provider
                onFormFinish={(name) => {
                    if (name === "form2") {
                        console.log("form2");

                    }
                }}
            >
                {screen === "form1" && (
                    <Step1 onClick={() => setScreen("form2")} onClickCSV={() => setScreen("form3")} />
                )}
                {screen === "form2" && (
                    <Step2 onClickBack={() => setScreen("form1")} />
                )}
                {screen === "form3" && (
                    <Step3 onClickBack={() => setScreen("form1")} />
                )}
            </Form.Provider>
        </div>
    );
}

