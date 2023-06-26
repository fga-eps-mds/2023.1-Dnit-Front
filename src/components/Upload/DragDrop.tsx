import React, { useRef, useState } from 'react';
import { FileOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload, Button } from 'antd';
import '../../styles/form/step3.css';
import { UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';
import "../../styles/form/step3.css"

const { Dragger } = Upload;

interface DragDropProps {
  onClickBack: () => void
}

const props: UploadProps = {
  name: 'arquivo',
  multiple: true,
  action: 'https://localhost:7083/api/escolas/cadastrarEscolaPlanilha',
  beforeUpload: () => false,
  onChange(info) {
    const { status, name } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(info.file.response)
      message.success(`${name} arquivo adicionado com sucesso.`);
    } else if (status === 'error') {
      message.error(`${name} falha ao receber arquivo.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC<DragDropProps> = ({onClickBack}: DragDropProps) => {
  const uploadRef = useRef<any>(null);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleButtonClick = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append('arquivo', fileList[0].originFileObj as File);

      try {
        const response = await axios.post(
          'https://localhost:7083/api/escolas/cadastrarEscolaPlanilha',
          formData
        );
        console.log(response.data);
        message.success('Arquivo enviado com sucesso.');
      } catch (error) {
        console.error(error);
        message.error('Ocorreu um erro ao enviar o arquivo.');
      }
    } else {
      message.warning('Nenhum arquivo carregado.');
    }
  };

  const handleFileChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList);
  };

  return (
    <>
      <Dragger ref={uploadRef} {...props} fileList={fileList} onChange={handleFileChange}>
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
        <Button className="botaoEnviar" type="primary" onClick={handleButtonClick}>
          Enviar
        </Button>
      </div>
    </>
  );
};

export default App;
