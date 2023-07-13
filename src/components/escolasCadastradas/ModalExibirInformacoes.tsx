import { notification } from "antd";
import { useEffect, useState } from "react";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { useSelectedValue } from "../../context/Situacao";
import { AlterarDadosEscolaData, EscolaData } from "../../models/service";
import fetchSituacao from "../../service/Situacao";
import fetchAlterarDadosEscola from "../../service/alterarDadosEscola";
import fetchDeleteSituation from "../../service/deleteSituation";
import ModalExcluirEscolas from "./ModalExcluirEscolas";
import "../estilo/ModalExibirInformacoes.css";
import ModalBody from "./ModalCamposEscola";

interface ModalProps {
  escola: EscolaData;
  open: boolean;
  close: () => void;
}

const ModalExibirInformacoes = ({ escola, open, close }: ModalProps) => {
  const [isModalExibirInformacoesOpen, setIsModalExibirInformacoesOpen] =
    useState(false);
  const [isModalExcluirEscolasOpen, setIsModalExcluirEscolasOpen] =
    useState(false);
  const [telefone, setTelefone] = useState(escola?.telefone);
  const [observacao, setObservacao] = useState(escola?.observacao);
  const [latitude, setLatitude] = useState(escola?.latitude);
  const [longitude, setLongitude] = useState(escola?.longitude);
  const [numAlunos, setNumAlunos] = useState(escola?.numeroTotalDeAlunos);
  const [numDocentes, setNumDocentes] = useState(escola?.numeroTotalDeDocentes);
  const [etapasEnsino, setEtapasEnsino] = useState(escola?.etapaEnsino);

  useEffect(() => {
    if (escola?.telefone) setTelefone(escola.telefone);
  }, [escola?.telefone]);

  useEffect(() => {
    if (escola?.observacao) setObservacao(escola.observacao);
  }, [escola?.observacao]);

  useEffect(() => {
    if (escola?.latitude) setLatitude(escola.latitude);
  }, [escola?.latitude]);

  useEffect(() => {
    if (escola?.longitude) setLongitude(escola.longitude);
  }, [escola?.longitude]);

  useEffect(() => {
    if (escola?.numeroTotalDeAlunos) setNumAlunos(escola.numeroTotalDeAlunos);
  }, [escola?.numeroTotalDeAlunos]);

  useEffect(() => {
    if (escola?.numeroTotalDeDocentes)
      setNumDocentes(escola.numeroTotalDeDocentes);
  }, [escola?.numeroTotalDeDocentes]);

  useEffect(() => {
    if (escola?.etapaEnsino) setEtapasEnsino(escola.etapaEnsino);
  }, [escola?.etapaEnsino]);

  const atualizarTelefone = (novoTelefone: any) => {
    setTelefone(novoTelefone);
  };

  const atualizarObservacao = (novaObservacao: any) => {
    setObservacao(novaObservacao);
  };

  const atualizarLatitude = (novaLatitude: any) => {
    setLatitude(novaLatitude);
  };

  const atualizarLongitude = (novaLongitude: any) => {
    setLongitude(novaLongitude);
  };

  const atualizarNumAlunos = (novoNumAlunos: any) => {
    setNumAlunos(novoNumAlunos);
  };

  const atualizarNumDocentes = (novoNumDocentes: any) => {
    setNumDocentes(novoNumDocentes);
  };

  const atualizarEtapaEnsino = (novoEtapaEnsino: any) => {
    setEtapasEnsino(novoEtapaEnsino);
  };

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
  const [, contextHolder] = notification.useNotification();
  const { fetchEscolasFiltradas } = useFiltroTabela();

  const chamarSituacao = async () => {
    let id = 0;
    const situacoes = await fetchSituacao();
    situacoes &&
      situacoes.forEach((situacao) => {
        if (situacao.descricao === selectedValue) id = situacao.id;
      });
    if (selectedValue === "Remover Situação") return -1;
    return id;
  };

  const onFinish = async (values: any) => {
    let IdEtapas = [];
    if (Array.isArray(etapasEnsino)) IdEtapas = etapasEnsino;
    else IdEtapas = Object.keys(etapasEnsino).map(Number);

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
    if (
      telefone !== escola.telefone ||
      latitude !== escola.latitude ||
      longitude !== escola.longitude ||
      numAlunos !== escola.numeroTotalDeAlunos ||
      numDocentes !== escola.numeroTotalDeDocentes ||
      observacao !== escola.observacao ||
      etapasEnsino !== escola.etapaEnsino ||
      etapasEnsino ||
      selectedValue !== escola.descricaoSituacao
    ) {
      const alterarDadosEscolaData = {
        idEscola: escola.idEscola,
        idSituacao: idSituacao,
        observacao: observacao || "",
        telefone: telefone,
        longitude: longitude,
        latitude: latitude,
        numeroTotalDeAlunos: numAlunos,
        numeroTotalDeDocentes: numDocentes,
        idEtapasDeEnsino: IdEtapas || [],
      };

      try {
        await fetchAlterarDadosEscola(
          alterarDadosEscolaData as AlterarDadosEscolaData
        );
        notification.success({ message: `Dados alterados com sucesso!` });
        fetchEscolasFiltradas();
      } catch (error) {
        notification.error({ message: `Erro ao alterar dados! ` });
      }
    }
    close();
  };

  if (!open) {
    return null;
  }
  return (
    <div className="overlay-modal">
      {contextHolder}
      <div>
        <div className="container">
          <div className="div br-modal large">
            <div className="br-modal-header">{escola.nomeEscola}</div>
            <ModalBody
              data={escola}
              onUpdateObservacao={atualizarObservacao}
              onUpdateTelefone={atualizarTelefone}
              onUpdateLatitude={atualizarLatitude}
              onUpdateLongitude={atualizarLongitude}
              onUpdateNumAlunos={atualizarNumAlunos}
              onUpdateNumDocentes={atualizarNumDocentes}
              onUpdateEtapasEnsino={atualizarEtapaEnsino}
            />
            <ModalExcluirEscolas
              open={isModalExcluirEscolasOpen}
              id={escola.idEscola}
              close={() => {
                setIsModalExcluirEscolasOpen(false);
                close();
              }}
              closeModalExcluirEscola={() => {
                setIsModalExcluirEscolasOpen(false);
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
                  onClick={() => {
                    close();
                    setSelectedValue("");
                  }}
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
