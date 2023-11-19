import {useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import {EtapasDeEnsinoData, RanqueInfo, Escola} from '../../models/service';
import {
  fetchEtapasDeEnsino,
  fetchMunicipio,
  fetchUnidadeFederativa
} from '../../service/escolaApi';
import TrilhaDeNavegacao from '../../components/Navegacao';
import ReactLoading from 'react-loading';
import Table, {CustomTableRow} from '../../components/Table';
import {fetchEscolasRanque, fetchProcessamentoDataRanque, fetchProcessamentoRanque} from '../../service/ranqueApi';
import {EscolaRanqueData, EscolaRanqueFiltro, ListaPaginada} from '../../models/ranque';
import {notification} from 'antd';
import ModalRanqueEscola from '../../components/EscolaRanqueModal';
import {formataCustoLogistico} from "../../utils/utils";
import { FiltroNome } from '../../components/FiltroNome';
import Select, { SelectItem } from '../../components/Select';

export interface EscolaDataRanque {
    ranqueInfo: RanqueInfo;
    escola: Escola;
}

function Ranque() {
  const [nome, setNome] = useState('')
  const [uf, setUf] = useState<SelectItem | null>(null);
  const [ufs, setUfs] = useState<SelectItem[]>([]);
  const [municipio, setMunicipio] = useState<SelectItem | null>(null);
  const [municipios, setMunicipios] = useState<SelectItem[]>([]);
  const [etapa, setEtapa] = useState<SelectItem | null>(null);
  const [etapas, setEtapas] = useState<SelectItem[]>([]);

  const [ProcessamentoUPS, setProcessamentoUPS] = useState<boolean>(false);
  const [ultimoProcessamento, setUltimoProcessamento] = useState<string>("");
  useEffect(() => {
    fetchProcessamentoRanque()
      .then((result) => setProcessamentoUPS(result))
      .catch((error) => {
        console.error('Erro ao buscar estado de processamento:', error);
      });

    fetchProcessamentoDataRanque()
      .then((result) => setUltimoProcessamento(result))
      .catch((error) => {
        console.error('Erro ao buscar data do último processamento:', error);
      });
  });

  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(true);
  const [escolas, setEscolas] = useState<ListaPaginada<EscolaRanqueData> | null>(null);
  const colunas = ['Posição', 'Pontuação', 'Escola', 'Etapas de Ensino', 'UF', 'Município', 'UF Superintendência', 'Custo Logístico'];


  const [paginacao, setPaginacao] = useState({pagina: 1, tamanhoPagina: 10,});
    const [notificationApi, notificationContextHandler] = notification.useNotification();

  useEffect(() => {
    fetchUnidadeFederativa()
      .then(ufs => setUfs(ufs.map(m => ({ id: m.id.toString(), rotulo: m.sigla }))));
    fetchEtapasDeEnsino()
      .then(etapas => {
        etapas.sort((a, b) => b.descricao.localeCompare(a.descricao));
        setEtapas(etapas.map(e => ({ id: e.id.toString(), rotulo: e.descricao })));
      });
  }, []);

  useEffect(() => {
    if (!uf?.id) {
      return;
    }
    fetchMunicipio(Number(uf.id)).then(municipios => setMunicipios(municipios.map(m => ({ id: m.id.toString(), rotulo: m.nome }))))
  }, [uf]);

  useEffect(() => {
    const filtro = { ...paginacao, nome: nome.trim().replace(/ +/gm, ' ') } as EscolaRanqueFiltro;

    if (!!uf) {
      filtro.idUf = Number(uf.id);
    }
    if (!!municipio) {
      filtro.idMunicipio = Number(municipio.id);
    }
    if (!!etapa) {
      filtro.idEtapaEnsino = [Number(etapa.id)];
    }

    fetchEscolasRanque(filtro)
      .then(e => {
        if (!!escolas?.items?.length && !!e.items.length && e.items[0]?.ranqueId != escolas?.items[0].ranqueId) {
          notificationApi.success({ message: "A tabela foi atualizada com os resultados do novo processamento" });
        }
        setEscolas(e);
      })
      .finally(() => setLoading(false));
  }, [nome, uf, municipio, etapa, paginacao]);
  

    const formatEtapaEnsino = (etapaEnsino: EtapasDeEnsinoData[], max = 2) => {
        if (!etapaEnsino) {
            return '';
        }
        return `${etapaEnsino.map(etapa => etapa.descricao).slice(0, max).join(', ')}${etapaEnsino.length > max ? '...' : ''}`;
    }
    
    const [escolaAtual, setEscolaAtual] = useState<EscolaRanqueData | null>();

  return (
      <div className="App ranque-container">
        <Header />
        {notificationContextHandler}
        {escolaAtual != null && <ModalRanqueEscola  onClose={()=>{setEscolaAtual(null)}} onCreateAcao={()=>{}} escolaRanque={escolaAtual}/>}
          
        <TrilhaDeNavegacao elementosLi={paginas} />

        <div className='d-flex flex-column m-5'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <FiltroNome nome={nome} onNomeChange={setNome} />
              <Select items={ufs} value={uf?.id || ''} label={"UF:"} onChange={id => setUf(ufs.find(u => u.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
              <Select items={municipios} value={municipio?.id || ''} label={"Municípios:"} onChange={id => setMunicipio(municipios.find(m => m.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
              <Select items={etapas} value={etapa?.id || ''} label={"Etapas de Ensino:"} onChange={id => setEtapa(etapas.find(e => e.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
            </div>
            <div className='d-flex align-items-center small-font mr-3'>
              {ProcessamentoUPS ? 'Novo cálculo de ranking em processamento...' : `Último processamento: ${ultimoProcessamento}`}
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
                            '5': e.escola.municipio?.nome || '',
                            '6': e.escola.ufSuperintendencia || '' ,
                            '7': formataCustoLogistico(e.escola.distanciaSuperintendencia),
                          }}
                          hideEditIcon={true}
                          hideTrashIcon={true}
                          onDetailRow={() => setEscolaAtual(e)}
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