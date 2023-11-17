import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import { fetchEtapasDeEnsino, fetchMunicipio, fetchUnidadeFederativa } from '../../service/escolaApi';
import { EtapasDeEnsinoData } from '../../models/service';
import TrilhaDeNavegacao from '../../components/Navegacao';
import ReactLoading from 'react-loading';
import Table, { CustomTableRow } from '../../components/Table';
import { fetchEscolasRanque } from '../../service/ranqueApi';
import { EscolaRanqueData, EscolaRanqueFiltro, ListaPaginada } from '../../models/ranque';
import { notification } from 'antd';
import { FiltroNome } from '../../components/FiltroNome';
import Select, { SelectItem } from '../../components/Select';
import {FiltroProvider} from "../../context/FiltroTabela";
import Modal from "../../components/Modal/index"

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
  const [nome, setNome] = useState('')
  const [uf, setUf] = useState<SelectItem | null>(null);
  const [ufs, setUfs] = useState<SelectItem[]>([]);
  const [municipio, setMunicipio] = useState<SelectItem | null>(null);
  const [municipios, setMunicipios] = useState<SelectItem[]>([]);
  const [etapa, setEtapa] = useState<SelectItem | null>(null);
  const [etapas, setEtapas] = useState<SelectItem[]>([]);

  const ProcessamentoUPS: boolean = false;
  const [ultimoProcessamento] = useState("23/05/2023 16:43");

  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(true);
  const [escolas, setEscolas] = useState<ListaPaginada<EscolaRanqueData> | null>(null);
  const colunas = ['Posição', 'Pontuação', 'Escola', 'Etapas de Ensino', 'UF', 'Município'];

  const [paginacao, setPaginacao] = useState({ pagina: 1, tamanhoPagina: 10, });
  const [notificationApi, notificationContextHandler] = notification.useNotification();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [escolaAtual, setEscolaAtual] = useState<EscolaRanqueData>();
    
    const abrirModal = (escolaAtual: EscolaRanqueData) => {
        setEscolaAtual(escolaAtual);
        const modal = document.getElementById("modal-informacoes");
        if(modal && modal.style) modal.style.display = "block"
        setIsOpen(true);
    };

    const fecharModal = (index: boolean) => {
        if(isOpen){
            const modal = document.getElementById("modal-informacoes");
            if(modal && modal.style) modal.style.display = "none";
            setIsOpen(false);
        }
    }

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

  return (
    <div className="App ranque-container">
      <Header />
      {notificationContextHandler}
      <FiltroProvider>
                <div id="modal-informacoes" style={{ display: 'none' }}>
                    <Modal
                        className="modal"
                    >
                        <h4 className="text-center mt-2">{escolaAtual?.escola.nome}</h4>
                        <div>
                        <p><strong>Posição:</strong> {escolaAtual?.posicao}</p>
                        <p><strong>Pontuação Total:</strong> {escolaAtual?.pontuacao}</p>
                        <p><strong>Código:</strong> {escolaAtual?.ranqueId}</p>
                        </div>
                        <button
                            className="br-button primary"
                            type="button"
                            onClick={() => fecharModal(isOpen)}
                        >
                            Sair
                        </button>
                    </Modal>
                </div>
            </FiltroProvider>
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} escolaSelecionada={escolaSelecionada} /> */}
      <TrilhaDeNavegacao elementosLi={paginas} />

      <div className='d-flex flex-column m-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <FiltroNome nome={nome} onNomeChange={setNome} />
            <Select items={ufs} value={uf?.id || ''} label={"UF"} onChange={id => setUf(ufs.find(u => u.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
            <Select items={municipios} value={municipio?.id || ''} label={"Municipios"} onChange={id => setMunicipio(municipios.find(m => m.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
            <Select items={etapas} value={etapa?.id || ''} label={"Etapas de Ensino"} onChange={id => setEtapa(etapas.find(e => e.id == id) || null)} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
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
                    '5': e.escola.municipio?.nome || ''
                  }}
                  hideTrashIcon={true}
                  onDetailRow={id => abrirModal(e)}
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