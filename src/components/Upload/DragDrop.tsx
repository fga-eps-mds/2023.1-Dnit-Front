import { FileOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import axios from "axios";
import React, { useRef, useState } from "react";
import { insertFileURL } from "../../consts/service";
import { useEscolasCadastradas } from "../../context/escolasCadastradasErro";
import "../../styles/form/step3.css";

const { Dragger } = Upload;

interface DragDropProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
  onClickErroJaCadastrada: () => void;
}

const props: UploadProps = {
  name: "arquivo",
  multiple: true,
  action: insertFileURL,
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
  onClickError,
  onClickAceito,
  onClickErroJaCadastrada,
}: DragDropProps) => {
  const uploadRef = useRef<any>(null);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const { setEscolasCadastradas } = useEscolasCadastradas();
  const handleButtonClick = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("arquivo", fileList[0].originFileObj as File);

      try {
        const response = await axios.post('https://localhost:7083/api/escolas/cadastrarEscolaPlanilha', formData);

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0 && response.data.length < 6 
        ) {
          // A resposta do back-end é uma lista não nula
          // Faça o que for necessário com a lista
          onClickErroJaCadastrada();
          setEscolasCadastradas(response.data);
        } else {
          // A resposta do back-end é uma lista nula
          message.success(`Arquivo adicionado com sucesso.`);
          onClickAceito();
          setEscolasCadastradas(response.data);
        }
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
          Enviar arquivo
        </Button>
      </div>
    </>
  );
};

export default App;
