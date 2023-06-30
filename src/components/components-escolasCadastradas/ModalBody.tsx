import { useState } from "react";
import Dropdown from "./Dropdown";

const ModalBody = (props: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

  };

  if (!props.open) {
    return null;
  }

  const getDescricaoSituacao = (value: number) => {
    const situacao = props.data.descricaoSituacao
    return situacao ? situacao.label : '';
  }

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
            placeholder={props.data.telefone}
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
          />
        </div>

        <div className="input-default">
          <label htmlFor="select-simple">Situação</label>
          <input 
            id="select-simple"
            type="text"
            placeholder={props.data.descricaoSituacao}
          />
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
        </div>
        {isDropdownOpen && <Dropdown onClose={openDropdown} onClick={setSelectedValue} />}
        <label htmlFor="input-icon">Observacao</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
          </div>
          <input id="input-default" type="text" placeholder="Exemplo" />
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
