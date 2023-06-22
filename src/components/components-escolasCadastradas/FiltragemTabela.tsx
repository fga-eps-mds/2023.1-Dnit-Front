import "../../styles/App.css";
import "../components-escolasCadastradas/FiltragemTabela.css";
import React, { useEffect, useState } from 'react';
import { useFiltroTabela } from "../../context/FiltroTabela";
import fetchFederativeUnit from "../../service/federativeUnit";
import { FederativeUnit } from "../../models/service";

export default function TabelaEscolas() {

  const {

    nomeEscola,
    setNomeEscola,

    UFSelecionada,
    setUFSelecionada,

    situacaoSelecionada,
    setSituacaoSelecionada,

    etapaDeEnsionoSelecionada,
    setEtapaDeEnsionoSelecionada,

    municipioSelecionado,
    setMunicipioSelecionado,
} = useFiltroTabela();

const getUf = async () => {
  try {
    const resposta = await fetchFederativeUnit();
    console.log(resposta);
    setOpcoesUf(resposta);
  } 
  catch (error) {
    console.log("error");
  }
}

useEffect(() => {
  if(opcoesUf.length == 0)
    getUf();
})


  const [showOptionsUF, setShowOptionsUF] = useState(false);
  const [opcoesUf, setOpcoesUf] = useState<FederativeUnit[]>([]);
  // const opcoesUf = [
  //   'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
  //   'Espirito Santo', 'Góias', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais',
  //   'Pará', 'Paraíba', 'Paraná', 'Pernanbuco', 'Piauí', 'Rio de Janeiro',
  //   'Rio Grande do Sul', 'Rio Grande do Norte', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo',
  //   'Sergipe', 'Tocantins'
  // ];

  const [showOptionsSituacao, setShowOptionsSituacao] = useState(false);
  const optionsSituacao = ["Indicação", "Solicitação da escola", "Jornada de crescimento do professor", "Escola crítica"];


  const [showOptionsEtapasEnsino, setShowOptionsEtapasEnsino] = useState(false);
  const optionsEtapasEnsino = ['1º a 3º ano', '4º a 6º ano', '7º a 9º ano'];
  // const

  const [showOptionsMunincipio, setShowOptionsMunincipio] = useState(false);
  const optionsMunincipio = ['Munincipio 1', 'Munincipio 2', 'Munincipio 3'];


  const alternarEstado = (valorAtual: boolean) => (!valorAtual);

  const handleButtonClick = (selectNumber: number) => {
    switch (selectNumber) {
      case 1:
        setShowOptionsUF(alternarEstado);
        break;
      case 2:
        setShowOptionsSituacao(alternarEstado);
        break;
      case 3:
        setShowOptionsEtapasEnsino(alternarEstado);
        break;
      case 4:
        setShowOptionsMunincipio(alternarEstado);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option: any, selectNumber: number) => {
    switch (selectNumber) {
      case 1:
        setUFSelecionada(option);
        setShowOptionsUF(false);
        break;
      case 2:
        setSituacaoSelecionada(option);
        setShowOptionsSituacao(false);
        break;
      case 3:
        setEtapaDeEnsionoSelecionada(option);
        setShowOptionsEtapasEnsino(false);
        break;
      case 4:
        setMunicipioSelecionado(option);
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
            placeholder={UFSelecionada ? UFSelecionada.nome: 'Todas'} />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(1)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsUF && (
              <div className="select-options">
                 <div
                    className="options"
                    onClick={() => handleOptionClick(false, 1)}
                  > Todas
                    </div>
                {opcoesUf.map((options, index) => (
                  <div
                    key={index}
                    className="options"
                    onClick={() => handleOptionClick(options, 1)}
                  >
                    
                    {options.nome}
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
            placeholder={situacaoSelecionada ? situacaoSelecionada : 'Todas'} />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(2)}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <div className="br-input">
            {showOptionsSituacao && (
              <div className="select-options">
                {optionsSituacao.map((options, index) => (
                  <div
                    key={options + index}
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
            placeholder={etapaDeEnsionoSelecionada ? etapaDeEnsionoSelecionada : 'Todas'} />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(3)}>
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
            placeholder={municipioSelecionado ? municipioSelecionado : 'Todos'} />
          <button
            className="br-button"
            type="button"
            aria-label="Exibir lista"
            tabIndex={-1}
            data-trigger="data-trigger"
            onClick={() => handleButtonClick(4)}>
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