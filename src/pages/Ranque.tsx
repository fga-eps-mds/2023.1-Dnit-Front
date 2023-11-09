import React, { useState, ChangeEvent } from 'react';
import Header from "../components/Cabecalho";
import Footer from "../components/Footer";
import Modal from "../components/EscolaRanqueModal"
import "../styles/App.css";
import "../styles/Ranque.css";
import { library, dom, icon } from '@fortawesome/fontawesome-svg-core';
import { faHome, faEye, faPlay, faArrowRight, faArrowLeft, faArrowDown } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faEye, faPlay, faArrowRight, faArrowLeft, faArrowDown );
dom.watch();

export interface EscolaData {
  posição: string;
  pontuação: number;
  escola: string;
  etapasEnsino: string;
  município: string;
  uf: string;
  código: string;
  alunos: number;
  porte: string;
  situação: string;
  endereço: string;
  telefone: string;
  professores: number;
  rede: string;
  etapasdeensino: string;
  numero: string;
  cep: string;
}

const dados: EscolaData[] = [
  { posição: '1°', pontuação: 1500, escola: 'CED 02 de Taguatinga', etapasEnsino: 'Ensino Médio', município: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '2°', pontuação: 1400, escola: 'Escola Municipal João da Silva', etapasEnsino: 'Ensino Fundamental', município: 'São Paulo', uf: 'SP', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '3°', pontuação: 1300, escola: 'Escola Particular Santos Dumont', etapasEnsino: 'Ensino Infantil', município: 'Rio de Janeiro', uf: 'RJ', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '4°', pontuação: 1200, escola: 'Escola Particular Santos Dumont', etapasEnsino: 'Educação Infantil', município: 'Belo Horizonte', uf: 'MG', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '5°', pontuação: 1100, escola: 'Escola Estadual José Alencar', etapasEnsino: 'Ensino Fundamental', município: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '6°', pontuação: 1000, escola: 'Escola Municipal São João', etapasEnsino: 'Ensino Fundamental', município: 'São Paulo', uf: 'SP', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '7°', pontuação: 950, escola: 'Escola Particular São Lucas', etapasEnsino: 'Ensino Médio', município: 'Rio de Janeiro', uf: 'RJ', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '8°', pontuação: 900, escola: 'Escola Particular Dom Bosco', etapasEnsino: 'Educação Infantil', município: 'Belo Horizonte', uf: 'MG', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '9°', pontuação: 850, escola: 'Escola Estadual Maria Silva', etapasEnsino: 'Ensino Fundamental', município: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { posição: '10°', pontuação: 800, escola: 'Escola Municipal Santa Clara', etapasEnsino: 'Ensino Fundamental', município: 'São Paulo', uf: 'SP', código: '209847', alunos: 999, porte: 'Entre 80 e 100 matrículas de escolarização', situação: 'Jornada de crecsimento do aluno', endereço: 'Rua Lindolfo Collor', telefone: '(60) 9999-9999', professores: 2, rede: 'Municipal', etapasdeensino: 'Educação Infantil', numero: '2', cep: '71844-540' },
];

const linhasPorPagina = 5;

function Ranque() {
  const [escolasPorPagina, setEscolasPorPagina] = useState(5);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const indiceInicio = (paginaAtual - 1) * escolasPorPagina;
  const indiceFim = paginaAtual * escolasPorPagina;

  const handleChangeEscolasPorPagina = (event: ChangeEvent<HTMLSelectElement>) => {
    setEscolasPorPagina(Number(event.target.value));
    setPaginaAtual(1);
  };

  const handleChangePagina = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData | null>(null);


  const handleAcao = (linha: EscolaData) => {
    setEscolaSelecionada(linha);
    setIsModalOpen(true);
  };

  const paginasTotais = Math.ceil(dados.length / escolasPorPagina);

  const paginaOptions = Array.from({ length: paginasTotais }, (_, index) => index + 1);
  
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');
  const [etapasEnsinoSelecionada, setEtapasEnsinoSelecionada] = useState('');
  
  const dadosFiltrados = dados.filter((linha) => {
    const ufFiltrado = ufSelecionado === '' || linha.uf === ufSelecionado;
    const municipioFiltrado =
      municipioSelecionado === '' || linha.município.includes(municipioSelecionado);
    const etapasEnsinoFiltrada = etapasEnsinoSelecionada === '' || linha.etapasEnsino === etapasEnsinoSelecionada;
  
    return ufFiltrado && municipioFiltrado && etapasEnsinoFiltrada;
  });
  
  
  const dadosExibidos = dadosFiltrados.slice(indiceInicio, indiceFim);

  const numeroTotalEscolas = dados.length;
  const numeroEscolasExibidas = dadosExibidos.length;

  const ProcessamentoUPS: boolean = false;  
  const [ultimoProcessamento] = useState("23/05/2023 16:43");

  return (
    <div>
      <Header />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} escolaSelecionada={escolaSelecionada} />
      <div className="margem">
      <div className="info-section">
      <i className="fas fa-home icon-color"></i>
      <p className="info-text small-font" style={{ display: "inline", marginLeft: "5px" }}>
       &gt; Ranking de Escolas
      </p>
      </div> <br/>
      <div className="filtros">
      <div className="filtro">
        <label htmlFor="uf">UF:</label>
        <select
          id="uf"
          value={ufSelecionado}
          onChange={(e) => setUfSelecionado(e.target.value)}
          style={{ marginLeft: "px", background: "none", color: "#1351b4", height: "40px", width: "150px",borderRadius: "5px" }}
        >
          <option value="">Todos</option>
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="AM">AM</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MT">MT</option>
          <option value="MS">MS</option>
          <option value="MG">MG</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PR">PR</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="RN">RN</option>
          <option value="RS">RS</option>
          <option value="RJ">RJ</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="SC">SC</option>
          <option value="SP">SP</option>
          <option value="SE">SE</option>
          <option value="TO">TO</option>
          </select>
      </div>

      <div className="filtro">
        <label htmlFor="municipio">Município:</label>
        <input
          type="text"
          id="municipio"
          value={municipioSelecionado}
          onChange={(e) => setMunicipioSelecionado(e.target.value)}
          style={{ marginLeft: "px", background: "none", color: "#1351b4", height: "40px", width: "150px", borderRadius: "5px", border: "1px solid #000" }}
        />
      </div>

      <div className="filtro">
        <label htmlFor="etapasEnsino">Etapas de Ensino:</label>
        <select
          id="etapasEnsino"
          value={etapasEnsinoSelecionada}
          onChange={(e) => setEtapasEnsinoSelecionada(e.target.value)}
          style={{ marginLeft: "px", background: "none", height: "40px", width: "150px",borderRadius: "5px" }}
        >
          <option value="">Todas</option>
          <option value="Ensino Médio">Ensino Médio</option>
          <option value="Ensino Fundamental">Ensino Fundamental</option>
          <option value="Ensino Infantil">Ensino Infantil</option>
          <option value="Educação Infantil">Educação Infantil</option>
          </select>
      </div>
    </div>
          <div className="processamento-info">
        {ProcessamentoUPS ? (
          <p className="small-font">Novo cálculo de ranking em processamento...</p>
        ) : (
          <p className="small-font">
            Último processamento: {ultimoProcessamento}&nbsp; &nbsp; &nbsp; &nbsp;
          </p>
        )}
      </div>
      <br/>
      <br/>
      <br/>
      <table>
      <thead>
          <tr>
            <th><strong>Posição</strong></th>
            <th><strong>Pontuação</strong></th>
            <th><strong>Escola</strong></th>
            <th><strong>Etapas de Ensino</strong></th>
            <th><strong>Município</strong></th>
            <th><strong>UF</strong></th>
            <th><strong>Ações</strong></th>
          </tr>
        </thead>
        <tbody>
          {dadosExibidos.map((linha, index) => (
            <tr key={index}>
              <td>{linha.posição}</td>
              <td>{linha.pontuação}</td>
              <td>{linha.escola}</td>
              <td>{linha.etapasEnsino}</td>
              <td>{linha.município}</td>
              <td>{linha.uf}</td>
              <td>
              <button onClick={() => handleAcao(linha)} className="button-no-border">
                <i className="fas fa-eye icon-color"></i>
                <i className="fas fa-play icon-color"></i>
               </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table><br/>
      <div className="paginação">
      <label htmlFor="escolasPorPagina" style={{ display: "inline", marginLeft: "5px", fontWeight: 'normal' }}>Exibir  </label>
        <select
          id="escolasPorPagina"
          value={escolasPorPagina}
          onChange={handleChangeEscolasPorPagina}
          style={{ border: "none", outline: "none", marginLeft: "px", background: "none", color: "#1351b4" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <p className="small-font">
        {numeroEscolasExibidas} de {numeroTotalEscolas} itens &nbsp;
        </p>
        </div>
      <div className="processamento-info2">
        <span>Página</span>
        <select
          value={paginaAtual}
          onChange={(e) => handleChangePagina(Number(e.target.value))}
          style={{ border: "none", marginLeft: "5px", outline: "none", background: "none", color: "#1351b4" }}
        >
          {paginaOptions.map((pagina) => (
            <option key={pagina} value={pagina}>
              {pagina}
            </option>
            
          ))}
        </select>
        <button
          style={{ marginRight: "5px", border: "none", outline: "none", background: "none", appearance: "none" }}
          disabled={paginaAtual === 1}
          onClick={() => handleChangePagina(paginaAtual - 1)}
        >
          <i className="fas fa-arrow-left icon-color"></i>
        </button>
        <button
          style={{ marginRight: "5px", border: "none", outline: "none", background: "none", appearance: "none" }}
          disabled={indiceFim >= dados.length}
          onClick={() => handleChangePagina(paginaAtual + 1)}
        >
          <i className="fas fa-arrow-right icon-color"></i>
        </button>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      <Footer />
    </div>
  );
}

export default Ranque;