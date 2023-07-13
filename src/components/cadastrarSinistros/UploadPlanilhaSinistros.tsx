import { FileOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import axios from "axios";
import React, { useRef, useState } from "react";
import { cadastroSinistrosURL } from "../../consts/service";
import "../../styles/form/step3.css";

const { Dragger } = Upload;

interface DragDropProps {
  onClickAceito: () => void;
  onClickBack: () => void;
  onClickError: () => void;
}

const props: UploadProps = {
  name: "arquivo",
  action: cadastroSinistrosURL,
  multiple: true,
  beforeUpload: () => false,
};

const App: React.FC<DragDropProps> = ({
  onClickError,
  onClickBack,
  onClickAceito,
}: DragDropProps) => {
  const uploadRef = useRef<any>(null);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const handleButtonClick = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("arquivo", fileList[0].originFileObj as File);

      try {
        await axios.post(cadastroSinistrosURL, formData);

        message.success(`Arquivo adicionado com sucesso.`);
        onClickAceito();
      } catch (error: any) {
        error.response && error.response.status == 406 && onClickError();

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
        {...props}
        ref={uploadRef}
        data-testid="drag-drop-container"
        onChange={handleFileChange}
        fileList={fileList}
      >
        <p className="ant-upload-drag-icon">
          <FileOutlined />
        </p>
        <p className="ant-upload-text">
          Você pode clicar ou arrastar arquivos aqui para adicioná-los.
        </p>
      </Dragger>
      <div className="container-botoes">
        <Button onClick={onClickBack} className="botaoCancelar">
          Cancelar
        </Button>
        <Button
          onClick={handleButtonClick}
          type="primary"
          className="botaoEnviar"
        >
          Enviar arquivo
        </Button>
      </div>
    </>
  );
};

export default App;
