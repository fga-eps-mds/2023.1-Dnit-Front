import { FileOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import React, { useRef, useState } from "react";
import { cadastroRodoviasURL } from "../../consts/service";
import "../../styles/form/step3.css";
import { fetchForm } from "../../service/autenticador";

const { Dragger } = Upload;

interface UploadPlanilhaRodoviaProps {
    onClickBack: () => void;
    onClickErrorTamanho: () => void;
    onClickAceito: () => void;
}

const props: UploadProps = {
    name: "arquivo",
    multiple: true,
    action: cadastroRodoviasURL,
    beforeUpload: () => false,
};

const App: React.FC<UploadPlanilhaRodoviaProps> = ({
    onClickBack,
    onClickErrorTamanho,
    onClickAceito,
}: UploadPlanilhaRodoviaProps) => {
    const uploadRef = useRef<any>(null);
    const [arquivos, setArquivos] = useState<UploadFile<any>[]>([]);
    const handleButtonClick = async () => {
        if (arquivos.length > 0) {
            const formData = new FormData();
            formData.append("arquivo", arquivos[0].originFileObj as File);
            try {
                await fetchForm(formData);
                message.success("Arquivo adicionado com sucesso");
                onClickAceito();

            } catch (error: any) {
                console.log(error.response);
                error.response && error.response.status == 406 && onClickErrorTamanho();

                let mensagem = error.response?.data;

                if(mensagem === undefined){
                    mensagem = 'Erro ao inserir arquivo'
                }

                message.error(`${mensagem}`);
            }
        } else {
            message.warning("Nenhum arquivo carregado.");
        }
    };

    const handleFileChange = ({ fileList }: UploadChangeParam) => {
        setArquivos(fileList);
    };

    return (
        <>
            <Dragger
                ref={uploadRef}
                {...props}
                fileList={arquivos}
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