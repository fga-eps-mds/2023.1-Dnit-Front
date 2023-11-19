import React, { ReactNode, useState, useEffect } from 'react';
import "../../styles/App.css";
import "../../pages/Ranque/index.css";
import Modal from "../../components/Modal/index";
import { fetchEscolaRanque } from '../../service/ranqueApi';
import { EscolaRanqueDetalhes } from '../../models/ranque';
import ReactLoading from "react-loading";

interface ModalProps {
  onClose: () => void;
  onCreateAcao: () => void;
  escolaId: string;
}

interface LabelProps {
  children: ReactNode,
  className?: string,
}

function Label({ children, className }: LabelProps) {
  return (<label style={{ fontSize: '14px', fontWeight: 'normal' }} className={'mb-2 ' + className}>
    {children}
  </label>)
}

const ModalRanqueEscola: React.FC<ModalProps> = ({ escolaId, onClose, onCreateAcao }) => {

  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaRanqueDetalhes | null>(null);

  useEffect(() => {
    fetchEscolaRanque(escolaId)
      .then(setEscolaSelecionada)
  }, []);

  if (!escolaSelecionada) {
    return (
      <Modal className="modal-title" closeModal={() => onClose()}>
        <h4 className="text-center mt-2">Carregando Escola... </h4>
        <div className="d-flex justify-content-center m-4">
          <ReactLoading type="spinningBubbles" color="#000000" />
        </div>
        <span></span>
      </Modal>
    );
  }

  return (
    <Modal className="default" closeModal={() => onClose()}>
      <div className="modal-content d-flex flex-column">
        <h4 className="text-center mt-1">Detalhes da Escola</h4>
        <div className='d-flex flex-column '>
          <Label>Nome: {escolaSelecionada.nome}</Label>
          <Label>Posição: {escolaSelecionada.ranqueInfo.posicao}</Label>
          <Label>Pontuação:</Label>
          <div className='d-flex flex-column'>
            {escolaSelecionada.ranqueInfo.fatores.map(f => <Label className='ml-4'>Fator {f.nome}, Peso {f.peso}, Valor {f.valor}</Label>)}
          </div>
          <Label>Total: {escolaSelecionada.ranqueInfo.pontuacao}</Label>
          <hr />
          <Label><strong>Dados</strong></Label>
          <Label>Código: {escolaSelecionada.codigo}</Label>
          <Label>Alunos: {escolaSelecionada.totalAlunos}</Label>
          <Label>Porte: {escolaSelecionada.porte?.descricao || ''}</Label>
          <Label>Situação: {escolaSelecionada.situacao?.descricao || ''}</Label>
        </div>

        <div className='lateralmodal'>
          <div className='d-flex flex-column'>
            <Label><strong>Endereço</strong></Label>
            <Label>{escolaSelecionada.endereco}</Label>
            <Label>Telefone: {escolaSelecionada.telefone}</Label>
            <Label>Professores: {escolaSelecionada.totalDocentes}</Label>
            <Label>Rede: {escolaSelecionada.rede?.id || ''}</Label>
            <Label>Etapas de Ensino: {escolaSelecionada.etapasEnsino?.map(e => e.descricao).join(',') || ''}</Label>
            <Label>Número: {escolaSelecionada.telefone}</Label>
            <Label>Cep: {escolaSelecionada.cep}</Label>
            <Label>Estado: {escolaSelecionada.uf?.sigla}</Label>
            <Label>Município: {escolaSelecionada.municipio?.nome}</Label>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex w-100 justify-content-end">
        <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
          Fechar
        </button>
        <button className="br-button primary mr-3" type="button" onClick={() => { onCreateAcao() }}>
          Criar Ação
        </button>
      </div>

    </Modal>
  );
};

export default ModalRanqueEscola;
