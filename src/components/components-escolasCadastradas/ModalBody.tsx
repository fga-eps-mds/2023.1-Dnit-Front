import { useState } from "react";
import Dropdown from "./Dropdown";
import fetchSituacao from "../../service/Situacao";
import { useSelectedValue } from "../../context/Situation";
import { Situacao } from "../../models/service";

const ModalBody = (props: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSelectedValue, selectedValue } = useSelectedValue();
  const[situacoes, setSituacoes]= useState <Situacao[]>();

  const ultimaAtualizacao = new Date()

  const chamarSituacao = async() =>{
    const situacoes = await fetchSituacao()
    setSituacoes(situacoes);
  }

  const openDropdown = async() => {
    setIsDropdownOpen(!isDropdownOpen);
    await chamarSituacao();
  };

  const handleSituacaoChange = (event:any) => {
    setSelectedValue(event.currentTarget.value)
    console.log(event.target.value);
    props.onUpdateSituacao(event.target.value);
  };

  const handleObservacaoChange = (event:any) => {
    props.onUpdateObservacao(event.target.value);
  };

  const handleTelefoneChange = (event:any) => {
    props.onUpdateTelefone(event.target.value);
  };

  const handleLatitudeChange = (event:any) => {
    props.onUpdateLatitude(event.target.value);
  };

  const handleLongitudeChange = (event:any) => {
    props.onUpdateLongitude(event.target.value);
  };

  const handleNumAlunosChange = (event:any) => {
    props.onUpdateNumAlunos(Number(event.target.value));
  };

  const handleNumDocentesChange = (event:any) => {
    props.onUpdateNumDocentes(Number(event.target.value));
  };

  return (
    <div className="br-modal-body">
      <div className="br-input">
        
        <label htmlFor="input-default">Código</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-barcode" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            value={props.data.codigoEscola}
            disabled
          />
        </div>
        <label htmlFor="input-default">Rede</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-school" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.descricaoRede}
            disabled
          />
        </div>
        <label htmlFor="input-default">UF</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-map-pin" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.siglaUf}
            disabled
          />
        </div>
        <label htmlFor="input-default">Município</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-building" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.nomeMunicipio}
            disabled
          />
        </div>
        <label htmlFor="input-default">Endereço</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-home" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.endereco}
            disabled
          />
        </div>
        <label htmlFor="input-default">Telefone</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-phone" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            onChange={handleTelefoneChange}
            placeholder={props.data.telefone}
          />
        </div>
        <label htmlFor="input-default">CEP</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-thumbtack" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.cep}
            disabled
          />
        </div>
        <label htmlFor="input-default">Etapa de Ensino</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-user-graduate" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={''}
          />
        </div>
        </div>
          <div className="br-input">
        <div className="input-default">
          <label htmlFor="select-simple">Situação</label>
          <input 
          onFocus={openDropdown}
          value={selectedValue}
          onChange={handleSituacaoChange}
            id="select-simple"
            type="text"
            placeholder={selectedValue ? selectedValue : props.data.descricaoSituacao}
          />
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              className="br-button"
              type="button"
              aria-label="Exibir lista"
              data-trigger="data-trigger"
              onClick={openDropdown}
              data-testid="dropdown-situacao"
            >
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </button>
            {selectedValue && (
              <button
                className="br-button"
                type="button"
                onClick={() => setSelectedValue("")}
              >
                <i className="fas fa-close" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </div>
        {isDropdownOpen && situacoes && <Dropdown onClose={openDropdown} onClick={setSelectedValue} situacoes={situacoes} descricao={props.data.descricaoSituacao}/>}
        <label htmlFor="input-default">Localização</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-map" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.descricaoLocalizacao}
            disabled
          />
        </div>
        <label htmlFor="input-default">Latitude</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-map-pin" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.latitude}
            onChange={handleLatitudeChange}
          />
        </div>
        <label htmlFor="input-default">Longitude</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-map-pin" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.longitude}
            onChange={handleLongitudeChange}
          />
        </div>
        <label htmlFor="input-default">Número total de alunos</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-users" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.numeroTotalDeAlunos}
            onChange={handleNumAlunosChange}
          />
        </div>
        <label htmlFor="input-icon">Número total de docentes</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-users" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={props.data.numeroTotalDeDocentes}
            onChange={handleNumDocentesChange}
          />
        </div>

        <label htmlFor="input-icon">Observacao</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
          </div>
          <input 
          id="input-default" 
          type="text" 
          onChange={handleObservacaoChange}
          placeholder={props.data.observacao} />
        </div>
        <label htmlFor="input-default">Ultima Atualização</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-sync" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={ultimaAtualizacao.toLocaleDateString()}
            disabled
          />
        </div>
      </div>
      </div>
  );
};

export default ModalBody;
