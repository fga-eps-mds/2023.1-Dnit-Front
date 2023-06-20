import "../../styles/App.css";
import "../components-escolasCadastradas/FiltragemTabela.css";
import React, { useState } from 'react';

export default function TabelaEscolas() {

  const [showOptionsUF, setShowOptionsUF] = useState(false);
  const [selectedOptionUF, setSelectedOptionUF] = useState('');
  const optionsUF = ['UF 1', 'UF 2', 'UF 3'];

  const [showOptionsSituacao, setShowOptionsSituacao] = useState(false);
  const [selectedOptionSituacao, setSelectedOptionSituacao] = useState('');
  const optionsSituacao = ['Situacao A', 'Situacao B', 'Situacao C'];

  const [showOptionsEtapasEnsino, setShowOptionsEtapasEnsino] = useState(false);
  const [selectedOptionEtapasEnsino, setSelectedOptionEtapasEnsino] = useState('');
  const optionsEtapasEnsino = ['1º a 3º ano', '4º a 6º ano', '7º a 9º ano'];

  const [showOptionsMunincipio, setShowOptionsMunincipio] = useState(false);
  const [selectedOptionMunincipio, setSelectedOptionMunincipio] = useState('');
  const optionsMunincipio = ['Munincipio 1', 'Munincipio 2', 'Munincipio 3'];

  const handleButtonClick = (selectNumber: any) => {
    switch (selectNumber) {
      case 1:
        setShowOptionsUF(!showOptionsUF);
        break;
      case 2:
        setShowOptionsSituacao(!showOptionsSituacao);
        break;
      case 3:
        setShowOptionsEtapasEnsino(!showOptionsEtapasEnsino);
        break;
      case 4:
        setShowOptionsMunincipio(!showOptionsMunincipio);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option:any, selectNumber:any) => {
    switch (selectNumber) {
      case 1:
        setSelectedOptionUF(option);
        setShowOptionsUF(false);
        break;
      case 2:
        setSelectedOptionSituacao(option);
        setShowOptionsSituacao(false);
        break;
      case 3:
        setSelectedOptionEtapasEnsino(option);
        setShowOptionsEtapasEnsino(false);
        break;
      case 4:
        setSelectedOptionMunincipio(option);
        setShowOptionsMunincipio(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container inputs">
      <div className="br-input medium input-button">
        <label htmlFor="input-search-medium">Nome</label>
        <input id="input-search-medium" type="search" placeholder="Digite o nome da Escola" />
        <button className="br-button" type="button" aria-label="Buscar">
          <i className="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>

      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">UF</label>
          <input 
            id="select-multtiple" 
            type="text" 
            placeholder={selectedOptionUF ? selectedOptionUF : 'Todas'}/>
          <button 
            className="br-button" 
            type="button" 
            aria-label="Exibir lista" 
            tabIndex={-1} 
            data-trigger="data-trigger"
            onClick={()=>handleButtonClick(1)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsUF && (
              <div className="select-options">
                {optionsUF.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 1)}
                  >
                    {options}
                  </div>
                ))}
              </div>
              )}
          </div>
        </div>
      </div>

      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Situação</label>
          <input 
            id="select-multtiple" 
            type="text" 
            placeholder={selectedOptionSituacao ? selectedOptionSituacao : 'Todas'}/>
          <button 
            className="br-button" 
            type="button" 
            aria-label="Exibir lista" 
            tabIndex={-1} 
            data-trigger="data-trigger"
            onClick={()=>handleButtonClick(2)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsSituacao && (
              <div className="select-options">
                {optionsSituacao.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 2)}
                  >
                    {options}
                  </div>
                ))}
              </div>
              )}
          </div>
        </div>
      </div>

      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Etapas de Ensino</label>
          <input 
            id="select-multtiple" 
            type="text" 
            placeholder={selectedOptionEtapasEnsino ? selectedOptionEtapasEnsino : 'Todas'}/>
          <button 
            className="br-button" 
            type="button" 
            aria-label="Exibir lista" 
            tabIndex={-1} 
            data-trigger="data-trigger"
            onClick={()=>handleButtonClick(3)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsEtapasEnsino && (
              <div className="select-options">
                {optionsEtapasEnsino.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 3)}
                  >
                    {options}
                  </div>
                ))}
              </div>
              )}
          </div>
        </div>
      </div>

      <div className="br-select" >
        <div className="br-input">
          <label htmlFor="select-multtiple">Munincípio</label>
          <input 
            id="select-multtiple" 
            type="text" 
            placeholder={selectedOptionMunincipio ? selectedOptionMunincipio : 'Todos'}/>
          <button 
            className="br-button" 
            type="button" 
            aria-label="Exibir lista" 
            tabIndex={-1} 
            data-trigger="data-trigger"
            onClick={()=>handleButtonClick(4)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsMunincipio && (
              <div className="select-options">
                {optionsMunincipio.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 4)} 
                  >
                    {options}
                  </div>
                ))}
              </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}