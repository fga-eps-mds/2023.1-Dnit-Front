import '../components-escolasCadastradas/style/ModalExibirInformacoes.css';
import { useEffect, useState } from "react";
import { notification } from 'antd';
import ModalBody from './ModalBody';
import { useSelectedValue } from '../../context/Situation';
import fetchchangeSituation from '../../service/changeSituation';
import ModalExcluirEscolas from "../components-escolasCadastradas/ModalExcluirEscolas";
import fetchDeleteSituation from "../../service/deleteSituation";
import { useFiltroTabela } from '../../context/FiltroTabela';


const ModalExibirInformacoes = (props: any) => {
  const { escola, open, close, onClose } = props;
  const [isModalExibirInformacoesOpen, setIsModalExibirInformacoesOpen] = useState(false);
  const [isModalExcluirEscolasOpen, setIsModalExcluirEscolasOpen] = useState(false);

  const openModal = async () => {
    setIsModalExibirInformacoesOpen(true);
  };

  useEffect(() => {

    if (!isModalExibirInformacoesOpen)
      if (open) {
        openModal();
      }
  })

  const { selectedValue } = useSelectedValue();
  const [api, contextHolder] = notification.useNotification();
  const {fetchEscolasFiltradas} = useFiltroTabela()

  const onFinish = async (values: any) => {
    

    if (selectedValue === -1) {

      console.log({ escola });
      const excluirSituacaoData = {
        idEscola: escola.idEscola
      };

      try {
        await fetchDeleteSituation(excluirSituacaoData);
        notification.success({ message: `Situação excluída com sucesso!` });
        fetchEscolasFiltradas();
      } catch (error) {
        notification.error({ message: `Erro ao excluir situação! ` });
      };
    }

    else {
      console.log("Received values of form: ", selectedValue);
      const salvarSituacaoData = {
        idEscola: escola.idEscola,
        idSituacao: selectedValue
      };

      try {
        await fetchchangeSituation(salvarSituacaoData);
        notification.success({ message: `Situação alterada com sucesso!` });
        fetchEscolasFiltradas();
      } catch (error) {
        notification.error({ message: `Erro ao alterar situação! ` });
        api.error({ message: `Erro ao salvar situação` });
      }
    };
    props.close();
  }

  if (!open) { return null }
  return (

    <>
      {contextHolder}
      <div className="modal">
        <div className="modal-content">
          <div>
            <div className="container">
              <div className="div br-modal large">
                <div className="br-modal-header">{escola.nomeEscola}
                </div>
                <ModalBody data={escola} open={isModalExibirInformacoesOpen} />
                <ModalExcluirEscolas open={isModalExcluirEscolasOpen} id={escola.idEscola} close={() => {
                  setIsModalExcluirEscolasOpen(false);
                  close();
                }} nomeEscola ={escola.nomeEscola}/>
                <div className="br-modal-footer ">
                  <div className="content-left">
                    <button className=" br-button cancel-button " type="button" onClick={() => setIsModalExcluirEscolasOpen(true)}>Excluir escola
                    </button>
                  </div>
                  <div className='content-right'>
                    <button className="br-button secondary" type="button" onClick={close}>Cancelar
                    </button>
                    <button className="br-button primary ml-2 " type="button" onClick={onFinish}>Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalExibirInformacoes;