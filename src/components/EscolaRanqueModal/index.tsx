import React, { useState, useEffect } from 'react';
import { EscolaData } from '../../pages/Ranque/index'; 
import "../../styles/App.css";
import "../../pages/Ranque/index.css";
import { EscolaRanqueData } from '../../models/ranque';
import { fetchData } from '../../service/escolaApi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    escola : EscolaRanqueData | undefined;
}



const ModalRanqueEscola: React.FC<ModalProps> = ({ isOpen, onClose, escola }) => {

  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData | undefined>();

  const fetchEscolaSelecionada = async () => {
    const escolas = await fetchData(escola?.escola?.id);
    setEscolaSelecionada(escolas);
  }
  useEffect(()=>{
    fetchEscolaSelecionada()
  }, []);

  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    width: '600px',
    height: '700px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const backdropStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    backdropFilter: 'blur(5px)', 
  };

  const buttonContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    padding: '10px',
  };

  const circularButtonStylecriaracao: React.CSSProperties = {
    width: '150px',
    height: '40px', 
    borderRadius: '20px', 
    margin: '10px',
    backgroundColor: '#1351b4',
    color: 'white', 
    border: 'none', 
    cursor: 'pointer',
  };

  const circularButtonStylefechar: React.CSSProperties = {
    width: '150px', 
    height: '40px', 
    borderRadius: '20px', 
    borderColor: '#1351b4',
    margin: '10px', 
    backgroundColor: 'white',
    color: '#1351b4', 
    cursor: 'pointer',
  };

  return (
    <div>
      <div className="backdrop" style={backdropStyle}></div>
      <div className="modal" style={modalStyle}>
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
          <div style={buttonContainerStyle}>
            <button onClick={onClose} style={circularButtonStylefechar}>Fechar</button>
            <button style={circularButtonStylecriaracao}>Criar Ação</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRanqueEscola;
