import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "../../components/EscolaRanqueModal"
import "./index.css";
import { library, dom, icon } from '@fortawesome/fontawesome-svg-core';
import { faHome, faEye, faPlay, faArrowRight, faArrowLeft, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { fetchEtapasDeEnsino, fetchUnidadeFederativa } from '../../service/escolaApi';
import { EtapasDeEnsinoData, UnidadeFederativaData } from '../../models/service';
import TrilhaDeNavegacao from '../../components/Navegacao';
import ReactLoading from 'react-loading';
import Table, { CustomTableRow } from '../../components/Table';
library.add(faHome, faEye, faPlay, faArrowRight, faArrowLeft, faArrowDown);
dom.watch();

export interface EscolaData {
  id: string;
  posicao: string;
  pontuacao: number;
  escola: string;
  etapasEnsino: string;
  municipio: string;
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
  { id: 'a', posicao: '1°', pontuacao: 1500, escola: 'CED 02 de Taguatinga', etapasEnsino: 'Ensino Médio', municipio: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'b', posicao: '2°', pontuacao: 1400, escola: 'Escola Municipal João da Silva', etapasEnsino: 'Ensino Fundamental', municipio: 'São Paulo', uf: 'SP', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'c', posicao: '3°', pontuacao: 1300, escola: 'Escola Particular Santos Dumont', etapasEnsino: 'Ensino Infantil', municipio: 'Rio de Janeiro', uf: 'RJ', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'd', posicao: '4°', pontuacao: 1200, escola: 'Escola Particular Santos Dumont', etapasEnsino: 'Educação Infantil', municipio: 'Belo Horizonte', uf: 'MG', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'e', posicao: '5°', pontuacao: 1100, escola: 'Escola Estadual José Alencar', etapasEnsino: 'Ensino Fundamental', municipio: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'f', posicao: '6°', pontuacao: 1000, escola: 'Escola Municipal São João', etapasEnsino: 'Ensino Fundamental', municipio: 'São Paulo', uf: 'SP', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'g', posicao: '7°', pontuacao: 950, escola: 'Escola Particular São Lucas', etapasEnsino: 'Ensino Médio', municipio: 'Rio de Janeiro', uf: 'RJ', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'h', posicao: '8°', pontuacao: 900, escola: 'Escola Particular Dom Bosco', etapasEnsino: 'Educação Infantil', municipio: 'Belo Horizonte', uf: 'MG', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'i', posicao: '9°', pontuacao: 850, escola: 'Escola Estadual Maria Silva', etapasEnsino: 'Ensino Fundamental', municipio: 'Brasília', uf: 'DF', código: '182736', alunos: 102, porte: 'Entre 60 e 90 matrículas de escolarização', situação: 'Jornada de crecsimento do professor', endereço: 'Rua Marechal Deodoro', telefone: '(61) 9999-9999', professores: 54, rede: 'Estadual', etapasdeensino: 'Educação Infantil, Ensino Fundamental e Ensino Médio', numero: '40', cep: '72844-588' },
  { id: 'j', posicao: '10°', pontuacao: 800, escola: 'Escola Municipal Santa Clara', etapasEnsino: 'Ensino Fundamental', municipio: 'São Paulo', uf: 'SP', código: '209847', alunos: 999, porte: 'Entre 80 e 100 matrículas de escolarização', situação: 'Jornada de crecsimento do aluno', endereço: 'Rua Lindolfo Collor', telefone: '(60) 9999-9999', professores: 2, rede: 'Municipal', etapasdeensino: 'Educação Infantil', numero: '2', cep: '71844-540' },
];

function Ranque() {
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');
  const [etapasEnsinoSelecionada, setEtapasEnsinoSelecionada] = useState('');

  const ProcessamentoUPS: boolean = false;
  const [ultimoProcessamento] = useState("23/05/2023 16:43");

  const [ufs, setUfs] = useState<UnidadeFederativaData[]>([]);
  const [etapasEnsino, setEtapasEnsino] = useState<EtapasDeEnsinoData[]>([]);

  useEffect(() => {
    fetchUnidadeFederativa()
      .then(ufs => setUfs(ufs));
    fetchEtapasDeEnsino()
      .then(etapas => {
        etapas.sort((a, b) => b.descricao.localeCompare(a.descricao));
        setEtapasEnsino(etapas);
      });
  }, []);

  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(false);
  const escolas = dados;
  const colunas = ['Posição', 'Pontuação', 'Escola', 'Etapas de Ensino', 'Município', 'UF'];

  return (
    <div className="App">
      <Header />
      {/* {notificationContextHandler} */}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} escolaSelecionada={escolaSelecionada} /> */}
      <TrilhaDeNavegacao elementosLi={paginas} />

      <div className='d-flex flex-column m-5'>
        <div className='d-flex justify-content-between align-items-center pl-3'>
          <div className="filtros">
            <div className="mr-4 text-start">
              <label htmlFor="uf" className='text-start'>UF:</label>
              <select
                id="uf"
                value={ufSelecionado}
                onChange={(e) => setUfSelecionado(e.target.value)}
                style={{ marginLeft: "px", background: "none", color: "#1351b4", height: "40px", width: "150px", borderRadius: "5px" }}
              >
                <option value="">Todos</option>
                {ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>)}
              </select>
            </div>
            <div className="mr-4 text-start">
              <label htmlFor="municipio">Município:</label>
              <input
                type="text"
                id="municipio"
                value={municipioSelecionado}
                onChange={(e) => setMunicipioSelecionado(e.target.value)}
                style={{ marginLeft: "px", background: "none", color: "#1351b4", height: "40px", width: "150px", borderRadius: "5px", border: "1px solid #000" }}
              />
            </div>

            <div className="mr-4 text-start">
              <label htmlFor="etapasEnsino">Etapas de Ensino:</label>
              <select
                id="etapasEnsino"
                value={etapasEnsinoSelecionada}
                onChange={(e) => setEtapasEnsinoSelecionada(e.target.value)}
                style={{ marginLeft: "px", background: "none", height: "40px", width: "150px", borderRadius: "5px" }}
              >
                <option value="">Todas</option>
                {etapasEnsino.map(e => <option key={e.id}>{e.descricao}</option>)}
              </select>
            </div>
          </div>

          <div>
            {ProcessamentoUPS ? (
              <p className="small-font mb-0">Novo cálculo de ranking em processamento...</p>
            ) : (
              <p className="small-font mb-0">
                Último processamento: {ultimoProcessamento}&nbsp; &nbsp; &nbsp; &nbsp;
              </p>
            )}
          </div>
        </div>


        {dados.length === 0 && <Table columsTitle={colunas} initialItemsPerPage={10} title=""><></><></></Table>}

        <Table
          columsTitle={colunas}
          title='' initialItemsPerPage={10} totalItems={escolas.length}>
          {
            dados.map((e, index) =>
              <CustomTableRow
                key={e.id}
                id={index}
                data={{ '0': e.posicao, '1': `${e.pontuacao}`, '2': e.escola, '3': e.etapasEnsino, '4': e.municipio, '5': e.uf }}
                hideTrashIcon={true}
              />
            )
          }
        </Table>
        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  );
}

export default Ranque;