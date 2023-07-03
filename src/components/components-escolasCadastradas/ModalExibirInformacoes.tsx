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
import { AdicionarObservacaoData, EscolaData } from "../../models/service";
import fetchAdicionarObservacao from "../../service/adicionarObservacao";
import fetchAlterarTelefone from "../../service/alterarTelefone";
import fetchAlterarNumDeAlunos from "../../service/alterarNumDeAlunos";
import fetchAlterarNumDeDocentes from "../../service/alterarNumDeDocentes";


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
  const [telefone, setTelefone] = useState(escola.telefone);
  const [numAlunos, setNumAlunos] = useState(escola.numeroTotalDeAlunos);
  const [numDocentes, setNumDocentes] = useState(escola.numeroTotalDeDocentes);

  const openModal = async () => {
    setIsModalExibirInformacoesOpen(true);
  };

  const atualizarTelefone = (novoTelefone: any) => {
    setTelefone(novoTelefone);
  };

  const atualizarNumAlunos = (novoNumAlunos: any) => {
    setNumAlunos(novoNumAlunos);
  };

  const atualizarNumDocentes = (novoNumDocentes: any) => {
    setNumDocentes(novoNumDocentes);
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
    }
    
    else  {
      const salvarSituacaoData = {
        idEscola: escola.idEscola,
        idSituacao: idSituacao,
      };

      try {
        await fetchchangeSituation(salvarSituacaoData);
        notification.success({ message: `Situação alterada com sucesso!` });
      } catch (error) {
        notification.error({ message: `Erro ao alterar situação! ` });
        api.error({ message: `Erro ao salvar situação` });
      }
    }

    const adicionarObservacaoData = {
      idEscola: escola.idEscola,
      observacao: escola.observacao,
    };

    try {
      await fetchAdicionarObservacao(escola.idEscola, escola.observacao);
      notification.success({ message: `observação adicionada com sucesso!` });
    } catch (error) {
      notification.error({ message: `Erro ao adicionar observacao! ` });
      api.error({ message: `Erro ao adicionar observacao` });
    }
    close();
    console.log(escola.observacao);

    const alterarTelefoneData = {
      idEscola: escola.idEscola,
      telefone: telefone
    };

    try {
      await fetchAlterarTelefone(alterarTelefoneData);
      //notification.success({ message: `Telefone alterado com sucesso!` });
    } catch (error) {
      notification.error({ message: `Erro ao adicionar telefone! ` });
      //api.error({ message: `Erro ao adicionar telefone` });
    }

    const alterarNumAlunos = {
      idEscola: escola.idEscola,
      numeroTotalDeAlunos: numAlunos,
    };

    try {
      await fetchAlterarNumDeAlunos(alterarNumAlunos);
      //notification.success({ message: `Número de alunos alterado com sucesso!` });
    } catch (error) {
      notification.error({ message: `Erro ao adicionar número de alunos! ` });
      //api.error({ message: `Erro ao adicionar telefone` });
    }

    const alterarNumDocentesData = {
      idEscola: escola.idEscola,
      numeroTotalDeDocentes: numDocentes,
    };

    try {
      await fetchAlterarNumDeDocentes(alterarNumDocentesData);
      //notification.success({ message: `Número de docentes alterado com sucesso!` });
    } catch (error) {
      notification.error({ message: `Erro ao adicionar número de docentes! ` });
      //api.error({ message: `Erro ao adicionar telefone` });
    }
    notification.success({ message: `Dados alterados com sucesso!` });

    fetchEscolasFiltradas();
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
                <ModalBody data={escola}
                 open={isModalExibirInformacoesOpen}
                 onUpdateTelefone={atualizarTelefone}
                 onUpdateNumAlunos={atualizarNumAlunos}
                 onUpdateNumDocentes={atualizarNumDocentes}
                  />
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
