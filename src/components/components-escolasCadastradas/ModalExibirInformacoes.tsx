import { notification } from "antd";
import { useEffect, useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { useSelectedValue } from "../../context/Situation";
import fetchchangeSituation from "../../service/changeSituation";
import fetchDeleteSituation from "../../service/deleteSituation";
import ModalExcluirEscolas from "../components-escolasCadastradas/ModalExcluirEscolas";
import "../components-escolasCadastradas/style/ModalExibirInformacoes.css";
import ModalBody from "./ModalBody";
import fetchSituacao from "../../service/Situacao";
import { EscolaData } from "../../models/service";


interface ModalProps{
  escola: EscolaData
  open: boolean
  close: () => void
}
const ModalExibirInformacoes = ({escola,open,close}:ModalProps) => {
  const [isModalExibirInformacoesOpen, setIsModalExibirInformacoesOpen] =
    useState(false);
  const [isModalExcluirEscolasOpen, setIsModalExcluirEscolasOpen] =
    useState(false);

  const openModal = async () => {
    setIsModalExibirInformacoesOpen(true);
  };

  useEffect(() => {
    if (!isModalExibirInformacoesOpen)
      if (open) {
        openModal();
      }
  });

  const { selectedValue, setSelectedValue } = useSelectedValue();
  const [api, contextHolder] = notification.useNotification();
  const { fetchEscolasFiltradas } = useFiltroTabela();

  const chamarSituacao = async() =>{
    const situacoes = await fetchSituacao()
    var id = 0;
    situacoes && situacoes.forEach(situacao=>{
      if(situacao.descricao === selectedValue)id = situacao.id;
    }
    )
    if(selectedValue === 'Remover Situação')return -1;
    return id;
  }

  const onFinish = async (values: any) => {
    const idSituacao = await chamarSituacao();
    if (idSituacao === -1) {
      const excluirSituacaoData = {
        idEscola: escola.idEscola,
      };

      try {
        await fetchDeleteSituation(excluirSituacaoData);
        notification.success({ message: `Situação excluída com sucesso!` });
        fetchEscolasFiltradas();
      } catch (error) {
        notification.error({ message: `Erro ao excluir situação! ` });
      }
    } else {
      const salvarSituacaoData = {
        idEscola: escola.idEscola,
        idSituacao: idSituacao,
      };

      try {
        await fetchchangeSituation(salvarSituacaoData);
        notification.success({ message: `Situação alterada com sucesso!` });
        fetchEscolasFiltradas();
      } catch (error) {
        notification.error({ message: `Erro ao alterar situação! ` });
        api.error({ message: `Erro ao salvar situação` });
      }
    }
    close();
  };

  if (!open) {
    return null;
  }
  return (
      <div>
      {contextHolder}
        <div>
            <div className="container">
              <div className="div br-modal large">
                <div className="br-modal-header">{escola.nomeEscola}</div>
                <ModalBody data={escola} open={isModalExibirInformacoesOpen} />
                <ModalExcluirEscolas
                  open={isModalExcluirEscolasOpen}
                  id={escola.idEscola}
                  close={() => {
                    setIsModalExcluirEscolasOpen(false); 
                    close();
                  }}
                  nomeEscola={escola.nomeEscola}
                />
                <div className="br-modal-footer ">
                  <div className="content-left">
                    <button
                      className=" br-button cancel-button "
                      type="button"
                      onClick={() => setIsModalExcluirEscolasOpen(true)}
                    >
                      Excluir escola
                    </button>
                  </div>
                  <div className="content-right">
                    <button
                      className="br-button secondary"
                      type="button"
                      onClick={()=>{close();setSelectedValue('')}}
                    >
                      Cancelar
                    </button>
                    <button
                      className="br-button primary ml-2 "
                      type="button"
                      onClick={onFinish}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
  );
};

export default ModalExibirInformacoes;
