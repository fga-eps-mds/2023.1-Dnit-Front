import { FileOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import fetchImportaPlanilha from "../../../../service/importarPlanilha";
import React, { useRef, useState } from "react";
import { cadastroEscolaPlanilhaURL } from "../../../../consts/service";
import { useEscolasCadastradas } from "../../../../context/escolasCadastradasErro";
import "../../../../styles/dados.css";

const { Dragger } = Upload;

interface UploadPlanilhaEscolaProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
  onClickErroJaCadastrada: () => void;
}

const props: UploadProps = {
  name: "arquivo",
  multiple: true,
  action: cadastroEscolaPlanilhaURL,
  beforeUpload: () => false,
  onChange(info) {
    const { status, name } = info.file;

    if (status === "error") {
      message.error(`${name} falha ao receber arquivo.`);
    }
  },
};

const UploadPlanilha: React.FC<UploadPlanilhaEscolaProps> = ({
  onClickBack,
  onClickError,
  onClickAceito,
  onClickErroJaCadastrada,
}: UploadPlanilhaEscolaProps) => {
  const uploadRef = useRef<any>(null);
  const [arquivos, setArquivos] = useState<UploadFile<any>[]>([]);
  const { setEscolasCadastradas } = useEscolasCadastradas();
  const handleButtonClick = async () => {
    if (arquivos.length > 0) {
      const arquivoData = new FormData();
      arquivoData.append("arquivo", arquivos[0].originFileObj as File);

      try {
        const response = await fetchImportaPlanilha(cadastroEscolaPlanilhaURL, arquivoData);

        if (
          response &&
          Array.isArray(response) &&
          response.length > 0 && response.length < 6 
        ) {
          // A resposta do back-end é uma lista não nula
          // Faça o que for necessário com a lista
          onClickErroJaCadastrada();
          setEscolasCadastradas(response);
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
          Enviar arquivo
        </Button>
      </div>
    </>
  );
};

export default UploadPlanilha;
