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
    onChange(info) {
        const { status, name } = info.file;

        if (status === "error") {
            message.error(`${name} falha ao receber arquivo.`);
        }
    },
};

const App: React.FC<DragDropProps> = ({
    onClickBack,
    onClickErrorTamanho,
    onClickAceito,
}: DragDropProps) => {
    const uploadRef = useRef<any>(null);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const handleButtonClick = async () => {
        console.log(fileList);
        if (fileList.length > 0) {
            const formData = new FormData();
            formData.append("arquivo", fileList[0].originFileObj as File);

            try {
                const resposta = await fetchInsertRodoviaFile(formData);

                if (
                    resposta.status !== 200
                ) {
                    // A resposta do back-end é uma lista não nula
                    // Faça o que for necessário com a lista
                    onClickErrorTamanho();

                } else {
                    // A resposta do back-end é uma lista nula
                    message.success("Arquivo adicionado com sucesso");
                    onClickAceito();
                }
            } catch (error: any) {
                error.resposta && error.resposta.status == 406 && onClickErrorTamanho();
                console.log("ola")
                const mensagem = error.resposta;
                message.error("erro");
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
                    Enviar
                </Button>
            </div>
        </>
    );
};

export default App;