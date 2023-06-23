import "../../styles/App.css";
import "../components-escolasCadastradas/TabelaEscola.css";
import fetchlistSchools from "../../service/listSchools";
import { useEffect, useState } from "react";
import { EscolaData } from "../../models/service";
import ExibirInformacoesEscola from "../../pages/ExibirInformacoesEscola";


export default function TabelaEscola() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showOptionsPages, setShowOptionsPages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [showSchoolsPerPage, setShowSchoolsPerPage] = useState(false);
  const [schoolsPerPage, setSchoolsPerPage] = useState(2);
  const optionsSchoolsPerPage = ['2', '5', '10', '20'];
  const [schools, setschools] = useState<EscolaData[]>([]);

  const [modalStates, setModalStates] = useState(Array(schools.length).fill(false));

  const handleButtonClick = (selectNumeber: any) => {
    switch (selectNumeber) {
      case 1:
        setShowOptionsPages(!showOptionsPages);
        break;
      case 2:

        break;
      default:
        break;
    }
  }
  const handleOptionClick = (option: any, selectNumber: any) => {
    switch (selectNumber) {
      case 1:
        setSchoolsPerPage(option);
        setShowSchoolsPerPage(false);

        break;
      case 2:
        setCurrentPage(option);
        setShowOptionsPages(false);       
        break;
    }
  }

  const OpenModal = (id: number, index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  }

  const CloseModal = (id: number, index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
  }

  const updateSchoolsPerPage = (value: number) => {
    if (value !== schoolsPerPage)
      setSchoolsPerPage(value);
  }

  const updateCurrentPage = (value: number) => {
    if (gettotalpages() >= (currentPage + value) && currentPage + value >= 1)
      setCurrentPage((currentValue) => (currentValue + value))
  }
  const gettotalpages = () => {
    let totalpages = schools.length / schoolsPerPage;
    if ((totalpages % 1) !== 0) {
      totalpages = Math.floor(totalpages) + 1;
    }
    return totalpages;
  }
  const getpagerange = () => {
    const rangeStart = ((currentPage - 1) * schoolsPerPage) + 1;
    let rangeEnd = (rangeStart + schoolsPerPage) - 1;
    if (rangeEnd > schools.length) {
      rangeEnd = schools.length;
    }
    return [rangeStart, rangeEnd];
  }
  const getSchool = async () => {
    try {
      const resultschools = await fetchlistSchools();
      console.log({ resultschools })
      setschools(resultschools);
    }
    catch (error) {
      console.log({ error })
    }

  }
  useEffect(() => {
    if (schools.length <= 0)
      getSchool();
  })

  return (

    <div className="br-table" data-search="data-search" data-selection="data-selection" data-collapse="data-collapse" data-random="data-random">
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">Escolas Cadastradas</div>
          <div className="actions-trigger text-nowrap">
            <div className="br-list" id="target01-27509" hidden>
              <button className="br-item" type="button" data-density="small">Densidade alta
              </button><span className="br-divider"></span>
              <button className="br-item" type="button" data-density="medium">Densidade média
              </button><span className="br-divider"></span>
              <button className="br-item" type="button" data-density="large">Densidade baixa
              </button>
            </div>
          </div>
        </div>
        <div className="search-bar">
          <div className="br-input">
            <label htmlFor="table-searchbox-27509">Buscar</label>
            <input id="table-searchbox-27509" type="text" placeholder="Buscar na tabela" />
            <button className="br-button circle" type="button" aria-label="Buscar"><i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <button className="br-button circle" type="button" data-dismiss="search" aria-label="Fechar busca"><i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="selected-bar">
          <div className="info"><span className="count">0</span><span className="text">item selecionado</span></div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle inverted" type="button" data-toggle="dropdown" data-target="target02-27509" aria-label="Ver mais opções"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target02-27509" hidden>
              <button className="br-item" type="button" data-toggle="">Ação 1
              </button><span className="br-divider"></span>
              <button className="br-item" type="button">Ação 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>Escolas Cadastradas</caption>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Etapas de Ensino</th>
            <th scope="col">Total de Alunos</th>
            <th scope="col">Situação</th>
            <th scope="col">Município</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {schools.length > 0 && schools.map((school, index) => {
            const range = getpagerange();
            if (index >= range[0] - 1 && index <= range[1] - 1)
              return (
                <>
                  <div className="modal-informacoes">
                    <ExibirInformacoesEscola open={modalStates[index]} escola = {school}  close={() => CloseModal(school.idEscola, index)} key={school.idEscola} />
                  </div>
                  <tr key={school.idEscola} onClick={() => OpenModal(school.idEscola, index)} data-testid="linha-escola">
                    <td data-th="Título coluna 1">{school.nomeEscola}</td>
                    <td data-th="Título coluna 2">{school.descricaoEtapasDeEnsino}</td>
                    <td data-th="Título coluna 3">{school.numeroTotalDeAlunos}</td>
                    <td data-th="Título coluna 4">{school.descricaoSituacao}</td>
                    <td data-th="Título coluna 5">{school.nomeMunicipio}</td>
                    <td data-th="Título coluna 6">{school.siglaUf}</td>
                  </tr></>
              )
            return <></>
          })}

          <tr className="collapse">
            <td id="collapse-1-4-27509" aria-hidden="true" hidden={true} colSpan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
          </tr>
        </tbody>
      </table>
      <div className="table-footer">
        <nav className="br-pagination" aria-label="Paginação de resultados" data-total={schools.length} data-current="38" data-per-page="20">
          <div className="pagination-per-page">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="per-page-selection-random-91921">Exibir</label>
                <input id="per-page-selection-random-91921" type="text" placeholder={schoolsPerPage.toString()} />
                <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true" onClick={() => handleButtonClick(1)}></i>
                </button>
                <div className="br-input">
                  {showOptionsPages && (
                    <div className="select-options">
                      {optionsSchoolsPerPage.map((options, index) => (
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
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex"><span className="current">{getpagerange()[0]}</span>&ndash;<span className="per-page">{getpagerange()[1]}</span>&nbsp;de&nbsp;<span className="total">{schools.length}</span>&nbsp;itens</div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="go-to-selection-random-15337">Página</label>
                <input id="go-to-selection-random-15337" type="text" placeholder={currentPage.toString()} />
                <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger"  >
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
                <div className="br-input">
                  {showSchoolsPerPage && (
                    <div className="select-options">
                      {optionsSchoolsPerPage.map((options, index) => (
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
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button className="br-button circle" type="button" aria-label="Voltar página" onClick={() => updateCurrentPage(-1)} ><i className="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button className="br-button circle" type="button" aria-label="Avançar página" onClick={() => updateCurrentPage(1)}><i className="fas fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>

  );
}