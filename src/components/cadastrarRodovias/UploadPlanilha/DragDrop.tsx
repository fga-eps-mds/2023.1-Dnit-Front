import { FileOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import axios from "axios";
import React, { useRef, useState } from "react";
import { insertFileRodoviasURL } from "../../../consts/service";
import "../../../styles/form/step3.css";
import fetchInsertRodoviaFile from "../../../service/insertFileRodovia";

const { Dragger } = Upload;

interface DragDropProps {
    onClickBack: () => void;
    onClickErrorTamanho: () => void;
    onClickAceito: () => void;
}

const props: UploadProps = {
    name: "arquivo",
    multiple: true,
    action: insertFileRodoviasURL,
    beforeUpload: () => false,
};

const App: React.FC<DragDropProps> = ({
    onClickBack,
    onClickErrorTamanho,
    onClickAceito,
}: DragDropProps) => {
    const uploadRef = useRef<any>(null);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const handleButtonClick = async () => {
        //console.log(fileList);
        if (fileList.length > 0) {
            const formData = new FormData();
            formData.append("arquivo", fileList[0].originFileObj as File);

            try {
                const resposta = await fetchInsertRodoviaFile(formData);



                    message.success("Arquivo adicionado com sucesso");
                    onClickAceito();
                
            } catch (error: any) {
                console.log(error.response);
                error.response && error.response.status == 406 && onClickErrorTamanho();

                const mensagem = error.response?.data;

                message.error(`${mensagem}`);
            }
        } else {
            message.warning("Nenhum arquivo carregado.");
        }
    };

    const handleFileChange = ({ fileList }: UploadChangeParam) => {
        setFileList(fileList);
    };

    return (
        <>
            <Dragger
                ref={uploadRef}
                {...props}
                fileList={fileList}
                onChange={handleFileChange}
                data-testid="drag-drop-container"
            >
                <p className="ant-upload-drag-icon">
                    <FileOutlined />
                </p>
                <p className="ant-upload-text">
                    Você pode clicar ou arrastar arquivos aqui para adicioná-los.
                </p>
            </Dragger>
            <div className="container-botoes">
                <Button className="botaoCancelar" onClick={onClickBack}>
                    Cancelar
                </Button>
                <Button
                    className="botaoEnviar"
                    type="primary"
                    onClick={handleButtonClick}
                >
                    Enviar Arquivo
                </Button>
            </div>
        </>
    );
};

export default App;