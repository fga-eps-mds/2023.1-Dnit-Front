import React, { useState, useEffect } from 'react';
import { EscolaData } from '../../pages/Ranque/index'; 
import "../../styles/App.css";
import "../../pages/Ranque/index.css";
import Modal from "../../components/Modal/index";
import {fetchData} from "../../service/escolaApi";

interface ModalProps {
    onClose: () => void;
    onCreateAcao: () => void;
    escolaId : string;
}

const ModalRanqueEscola: React.FC<ModalProps> = ({ escolaId, onClose, onCreateAcao,}) => {

  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData | undefined>();

  const fetchEscolaSelecionada = async () => {
    const escolas = await fetchData(escolaId);
    setEscolaSelecionada(escolas);
  }
  useEffect(()=>{
    fetchEscolaSelecionada()
  }, []);
  
  return (
      <Modal className={"default"} closeModal={() => onClose()}>
          
          <div className="modal-content">
              <h2 style={{ fontSize: '16px' }}><strong>Detalhes da Escola</strong></h2>
              {escolaSelecionada && (
                  <div>
                      <p style={{ fontSize: '12px' }}>Nome: {escolaSelecionada.escola.nomeEscola}</p>
                      <p style={{ fontSize: '12px' }}>Posição: {escolaSelecionada.ranqueInfo.posicao}</p>
                      <p style={{ fontSize: '12px' }}>Pontuação:</p>
                      Fator X, Peso X, Valor X<br/>
                      Fator Y, Peso Y, Valor Y<br/>
                      Fator Z, Peso Z, Valor Z<br/>
                      UPS, Peso 2,16<br/>
                      <p style={{ fontSize: '12px' }}>Total: {escolaSelecionada.ranqueInfo.pontuacao}</p>
                      <p style={{ fontSize: '12px' }}><strong>Dados</strong></p>
                      <p style={{ fontSize: '12px' }}>Código: {escolaSelecionada.escola.codigoEscola}</p>
                      <p style={{ fontSize: '12px' }}>Alunos: {escolaSelecionada.escola.numeroTotalDeAlunos}</p>
                      <p style={{ fontSize: '12px' }}>Porte: {escolaSelecionada.escola.porte}</p>
                      <p style={{ fontSize: '12px' }}>Situação: {escolaSelecionada.escola.situacao}</p>
                  </div>
              )}

              <div className='lateralmodal'>
                  {escolaSelecionada && (
                      <div>
                          <p style={{ fontSize: '12px' }}><strong>Endereço</strong></p>
                          {escolaSelecionada.escola.endereco}
                          <p style={{ fontSize: '12px' }}>Telefone: {escolaSelecionada.escola.telefone}</p>
                          <p style={{ fontSize: '12px' }}>Professores: {escolaSelecionada.escola.numeroTotalDeDocentes}</p> 
                          <p style={{ fontSize: '12px' }}>Rede: {escolaSelecionada.escola.rede}</p>
                          <p style={{ fontSize: '12px' }}>Etapas de Ensino: {escolaSelecionada.escola.etapasEnsino}</p>
                          {/*sem numero*/}
                          <p style={{ fontSize: '12px' }}>Número: {escolaSelecionada.escola.telefone}</p> 
                          <p style={{ fontSize: '12px' }}>Cep: {escolaSelecionada.escola.cep}</p>
                          <p style={{ fontSize: '12px' }}>Estado: {escolaSelecionada.escola.uf}</p>
                      </div>
                  )} 
              </div>
          </div>      
          
        <div className="d-flex w-100 justify-content-end">
            <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                Fechar
            </button>
            <button className="br-button primary mr-3" type="button" onClick={() => {onCreateAcao()}}>
                Criar Ação
            </button>
        </div>

      </Modal>
  );
};

export default ModalRanqueEscola;
