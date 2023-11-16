import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import { fetchEtapasDeEnsino, fetchUnidadeFederativa } from '../../service/escolaApi';
import { EtapasDeEnsinoData, UnidadeFederativaData } from '../../models/service';
import TrilhaDeNavegacao from '../../components/Navegacao';
import ReactLoading from 'react-loading';
import Table, { CustomTableRow } from '../../components/Table';
import { fetchEscolasRanque } from '../../service/ranqueApi';
import { EscolaRanqueData, EscolaRanqueFiltro, ListaPaginada } from '../../models/ranque';
import { notification } from 'antd';
import { FiltroNome } from '../../components/FiltroNome';

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

function Ranque() {
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');
  const [etapasEnsinoSelecionada, setEtapasEnsinoSelecionada] = useState('');
  const [nome, setNome] = useState('')

  const ProcessamentoUPS: boolean = false;
  const [ultimoProcessamento] = useState("23/05/2023 16:43");

  const [ufs, setUfs] = useState<UnidadeFederativaData[]>([]);
  const [etapasEnsino, setEtapasEnsino] = useState<EtapasDeEnsinoData[]>([]);

  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(true);
  const [escolas, setEscolas] = useState<ListaPaginada<EscolaRanqueData> | null>(null);
  const colunas = ['Posição', 'Pontuação', 'Escola', 'Etapas de Ensino', 'UF', 'Município'];

  const [paginacao, setPaginacao] = useState({ pagina: 1, tamanhoPagina: 10, });
  const [notificationApi, notificationContextHandler] = notification.useNotification();

  useEffect(() => {
    fetchUnidadeFederativa()
      .then(ufs => setUfs(ufs));
    fetchEtapasDeEnsino()
      .then(etapas => {
        etapas.sort((a, b) => b.descricao.localeCompare(a.descricao));
        setEtapasEnsino(etapas);
      });
  }, []);

  useEffect(() => {
    fetchEscolasRanque({ ...paginacao, nome: nome.trim().replace(/ +/gm, ' ') })
      .then(e => {
        if (!!escolas?.items?.length && !!e.items.length && e.items[0]?.ranqueId != escolas?.items[0].ranqueId) {
          notificationApi.success({ message: "A tabela foi atualizada com os resultados do novo processamento" });
        }
        setEscolas(e);
      })
      .finally(() => setLoading(false));
  }, [nome, ufSelecionado, municipioSelecionado, etapasEnsino, paginacao]);

  const formatEtapaEnsino = (etapaEnsino: EtapasDeEnsinoData[], max = 2) => {
    if (!etapaEnsino) {
      return '';
    }
    return `${etapaEnsino.map(etapa => etapa.descricao).slice(0, max).join(', ')}${etapaEnsino.length > max ? '...' : ''}`;
  }

  return (
    <div className="App ranque-container">
      <Header />
      {notificationContextHandler}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} escolaSelecionada={escolaSelecionada} /> */}
      <TrilhaDeNavegacao elementosLi={paginas} />

      <div className='d-flex flex-column m-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex flex-column'>
            <FiltroNome nome={nome} onNomeChange={setNome} />
          </div>
          {/* <div className="filtros">
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
                <option value="_">Todas</option>
                {etapasEnsino.map(e => <option key={e.id}>{e.descricao}</option>)}
              </select>
            </div>
          </div> */}

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

        {(loading || !escolas?.items?.length) && <Table columsTitle={colunas} initialItemsPerPage={10} totalItems={0} title=""><></><></></Table>}
        {escolas?.items != null &&
          <Table
            columsTitle={colunas}
            title='' initialItemsPerPage={10} totalItems={escolas?.total}
            onNextPage={() => {
              if (paginacao.pagina === escolas?.totalPaginas) return;
              setPaginacao(p => { return { ...p, pagina: p.pagina + 1 } })
            }}
            onPreviousPage={() => {
              if (paginacao.pagina === 1) return;
              setPaginacao({ ...paginacao, pagina: paginacao.pagina - 1 })
            }}
            onPageResize={(tamanhoPagina) => {
              setPaginacao({ ...paginacao, tamanhoPagina })
            }}
            onPageSelect={(pagina) => {
              setPaginacao({ ...paginacao, pagina })
            }}>
            {
              escolas?.items.map((e, index) =>
                <CustomTableRow
                  key={e.escola.id}
                  id={index}
                  data={{
                    '0': `${e.posicao + 1}°`,
                    '1': `${e.pontuacao}`,
                    '2': e.escola.nome,
                    '3': formatEtapaEnsino(e.escola.etapaEnsino),
                    '4': e.escola.uf?.sigla || '',
                    '5': e.escola.municipio?.nome || ''
                  }}
                  hideTrashIcon={true}
                />
              )
            }
          </Table>
        }

        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  );
}

export default Ranque;