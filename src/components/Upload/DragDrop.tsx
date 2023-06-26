import React, { useRef, useState } from 'react';
import { FileOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload, Button } from 'antd';
import '../../styles/form/step3.css';
import { UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';
import "../../styles/form/step3.css"
import { useEscolasCadastradas } from '../../context/escolasCadastradasErro';

const { Dragger } = Upload;

interface DragDropProps {
  onClickBack: () => void
  onClickError: () => void
  onClickAceito: () => void
  onClickErroJaCadastrada: () => void
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
    if (status === 'error') {
      message.error(`${name} falha ao receber arquivo.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC<DragDropProps> = ({onClickBack, onClickError, onClickAceito, onClickErroJaCadastrada}: DragDropProps) => {
  const uploadRef = useRef<any>(null);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const {setEscolasCadastradas} = useEscolasCadastradas()
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

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // A resposta do back-end é uma lista não nula
          // Faça o que for necessário com a lista
          onClickErroJaCadastrada();
          setEscolasCadastradas(response.data);
          console.log('Lista não nula:', response.data);
        } else {
          // A resposta do back-end é uma lista nula
          message.success(`Arquivo adicionado com sucesso.`);
          onClickAceito();
          console.log('Lista nula');
        }

      } catch (error:any) {
        console.error(error);
        if(error.response && error.response.status == 406){
          onClickError();
        }
        const mensagem = error.response.data;
        message.error(`${mensagem}`);
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
          Enviar arquivo
        </Button>
      </div>
    </>
  );
};

export default App;
