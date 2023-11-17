import React, { useState, useEffect } from 'react';
import { EscolaData } from '../../pages/Ranque/index'; 
import "../../styles/App.css";
import "../../pages/Ranque/index.css";
import { EscolaRanqueData } from '../../models/ranque';
import { fetchData } from '../../service/escolaApi';
import Modal from "../../components/Modal/index";

interface ModalProps {
    isOpen: boolean;
    onClose: (status: boolean) => void;
    escola : EscolaRanqueData | undefined;
}

const ModalRanqueEscola: React.FC<ModalProps> = ({ isOpen, onClose, escola }) => {

  // const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData | undefined>();
  //
  // const fetchEscolaSelecionada = async () => {
  //   const escolas = await fetchData(escola?.escola?.id);
  //   setEscolaSelecionada(escolas);
  // }
  // useEffect(()=>{
  //   fetchEscolaSelecionada()
  // }, []);
  //
  // setEscolaSelecionada(escolaDataExemplo);

  const escolaSelecionada: EscolaData = {
    id: '123',
    posicao: '1',
    pontuacao: 90,
    escola: 'Escola Exemplo',
    etapasEnsino: 'Fundamental',
    municipio: 'Cidade Exemplo',
    uf: 'UF',
    código: 'ABC123',
    alunos: 500,
    porte: 'Médio',
    situação: 'Ativa',
    endereço: 'Rua Exemplo, 123',
    telefone: '(11) 1234-5678',
    professores: 20,
    rede: 'Pública',
    etapasdeensino: 'Fundamental',
    numero: '123',
    cep: '12345-678',
  };
  
  return (
      <Modal
          className={"default"}
          closeModal={() => onClose(isOpen)}
      >
        <h4 className="text-center mt-2">{escolaSelecionada?.escola}</h4>

          <div className="modal-content">
              <h2 style={{ fontSize: '16px' }}><strong>Detalhes da Escola</strong></h2>
              {escolaSelecionada && (
                  <div>
                      <p style={{ fontSize: '12px' }}>Nome: {escolaSelecionada.escola}</p>
                      <p style={{ fontSize: '12px' }}>Posição: {escolaSelecionada.posicao}</p>
                      <p style={{ fontSize: '12px' }}>Pontuação:</p>
                      Fator X, Peso X, Valor X<br/>
                      Fator Y, Peso Y, Valor Y<br/>
                      Fator Z, Peso Z, Valor Z<br/>
                      UPS, Peso 2,16<br/>
                      <p style={{ fontSize: '12px' }}>Total: {escolaSelecionada.pontuacao}</p>
                      <p style={{ fontSize: '12px' }}><strong>Dados</strong></p>
                      <p style={{ fontSize: '12px' }}>Código: {escolaSelecionada.código}</p>
                      <p style={{ fontSize: '12px' }}>Alunos: {escolaSelecionada.alunos}</p>
                      <p style={{ fontSize: '12px' }}>Porte: {escolaSelecionada.porte}</p>
                      <p style={{ fontSize: '12px' }}>Situação: {escolaSelecionada.situação}</p>
                  </div>
              )}

              <div className='lateralmodal'>
                  {escolaSelecionada && (
                      <div>
                          <p style={{ fontSize: '12px' }}><strong>Endereço</strong></p>
                          {escolaSelecionada.endereço}
                          <p style={{ fontSize: '12px' }}>Telefone: {escolaSelecionada.telefone}</p>
                          <p style={{ fontSize: '12px' }}>Professores: {escolaSelecionada.professores}</p>
                          <p style={{ fontSize: '12px' }}>Rede: {escolaSelecionada.rede}</p>
                          <p style={{ fontSize: '12px' }}>Etapas de Ensino: {escolaSelecionada.etapasdeensino}</p>
                          <p style={{ fontSize: '12px' }}>Número: {escolaSelecionada.numero}</p>
                          <p style={{ fontSize: '12px' }}>Cep: {escolaSelecionada.cep}</p>
                          <p style={{ fontSize: '12px' }}>Estado: {escolaSelecionada.uf}</p>
                      </div>
                  )} 
              </div>
          </div>      
          
        <button
            className="br-button primary"
            type="button"
            onClick={() => {
              onClose(!isOpen);
            }}
        >
          Sair
        </button>

      </Modal>
  );
};

export default ModalRanqueEscola;
