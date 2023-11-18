import React, { useState, useEffect } from 'react';
import {EscolaDataRanque, formataCustoLogistico} from '../../pages/Ranque'; 
import "../../styles/App.css";
import "../../pages/Ranque/index.css";
import Modal from "../../components/Modal/index";
import {fetchEscolaData} from "../../service/escolaApi";

interface ModalProps {
    onClose: () => void;
    onCreateAcao: () => void;
    escolaId : string;
}

const ModalRanqueEscola: React.FC<ModalProps> = ({ escolaId, onClose, onCreateAcao }) => {

  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaDataRanque | undefined>();

  const fetchEscolaSelecionada = async () => {
    const escolas = await fetchEscolaData(escolaId);
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
                          <div style={{ marginLeft: '40px' }}>
                              {escolaSelecionada.ranqueInfo.fatores?.map((fator, index) => (
                                  <p key={index} style={{ fontSize: '12px' }}>
                                      Fator: {fator.nome}, Peso: {fator.peso}, Valor: {fator.valor}
                                  </p>
                              ))}
                              <p style={{ fontSize: '12px' }}>
                                  Custo Logístico: {formataCustoLogistico(escolaSelecionada.escola.distanciaSuperintendencia)}
                              </p>
                          </div>
                      <p/>
                      <p style={{ fontSize: '12px' }}>Total: {escolaSelecionada.ranqueInfo.pontuacao}</p>
                      <hr/>
                      <br/>
                      <p style={{ fontSize: '12px' }}><strong>Dados</strong></p>
                      <p style={{ fontSize: '12px' }}>Código: {escolaSelecionada.escola.codigoEscola}</p>
                      <p style={{ fontSize: '12px' }}>Alunos: {escolaSelecionada.escola.numeroTotalDeAlunos}</p>
                      <p style={{ fontSize: '12px' }}>Professores: {escolaSelecionada.escola.numeroTotalDeDocentes}</p>
                      <p style={{ fontSize: '12px' }}>Porte: {escolaSelecionada.escola.descricaoPorte}</p>
                      <p style={{ fontSize: '12px' }}>Telefone: {escolaSelecionada.escola.telefone}</p>
                      <p style={{ fontSize: '12px' }}>Situação: {escolaSelecionada.escola.situacao}</p>
                      <p style={{ fontSize: '12px' }}>Etapas de ensino: </p>
                      <div style={{ marginLeft: '40px' }}>
                          {escolaSelecionada.escola.etapasEnsino?.map((etapa, index) => (
                              <p key={index} style={{ fontSize: '12px' }}>
                                  descrição: {etapa.descricao}
                              </p>
                          ))}
                      </div>
                  </div>
              )}

              <div className='lateralmodal'>
                  {escolaSelecionada && (
                      <div>
                          <br/>
                          <br/>
                          <p style={{ fontSize: '12px' }}><strong>Endereço</strong></p>
                          {escolaSelecionada.escola.endereco}
                          <p/>
                          <p style={{ fontSize: '12px' }}>Estado: {escolaSelecionada.escola.descricaoUf}</p>
                          <p style={{ fontSize: '12px' }}>Cep: {escolaSelecionada.escola.cep}</p>
                          <p style={{ fontSize: '12px' }}>Rede: {escolaSelecionada.escola.rede}</p>
                          {/*<p style={{ fontSize: '12px' }}>Número: {escolaSelecionada.escola.telefone}</p>*/}
                      </div>
                  )} 
              </div>

              {escolaSelecionada && (
                  <div>
                      <br/>
                      <hr/>
                      <br/>
                      <p style={{ fontSize: '12px' }}><strong>Superintendência</strong></p>
                      <p style={{ fontSize: '12px' }}>Distância Superintendência: {escolaSelecionada.escola.distanciaSuperintendencia}</p>
                      <p style={{ fontSize: '12px' }}>
                          Endereço Superintendência: {escolaSelecionada.escola.enderecoSuperintendencia} - {escolaSelecionada.escola.cepSuperintendencia}
                      </p>
                      <p style={{ fontSize: '12px' }}>UF Superintendência: {escolaSelecionada.escola.ufSuperintendencia}</p>
                  </div>
              )}
              
          </div>      
          <br/>
        <div className="d-flex w-100 justify-content-end">
            <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                Fechar
            </button>
            <button className="br-button primary mr-3" type="button" onClick={() => onCreateAcao()}>
                Criar Ação
            </button>
        </div>

      </Modal>
  );
};

export default ModalRanqueEscola;
