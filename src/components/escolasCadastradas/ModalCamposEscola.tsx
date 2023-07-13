import { Select } from "antd";
import { ChangeEvent, useState } from "react";
import { useSelectedValue } from "../../context/Situacao";
import { EscolaData, SituacaoData } from "../../models/service";
import fetchSituacao from "../../service/Situacao";
import fetchEtapasDeEnsino from "../../service/etapasDeEnsino";
import Dropdown from "./Dropdown";

interface ModalBodyProps {
  data: EscolaData;
  onUpdateObservacao: (novaObservacao: any) => void;
  onUpdateTelefone: (novaTelefone: any) => void;
  onUpdateLatitude: (novaLatitude: any) => void;
  onUpdateLongitude: (novaLongitude: any) => void;
  onUpdateNumAlunos: (novaNumAlunos: any) => void;
  onUpdateNumDocentes: (novaNumDocentes: any) => void;
  onUpdateEtapasEnsino: (novaEtapasEnsino: any) => void;
}

const ModalBody = ({
  data,
  onUpdateTelefone,
  onUpdateObservacao,
  onUpdateLatitude,
  onUpdateLongitude,
  onUpdateNumAlunos,
  onUpdateNumDocentes,
  onUpdateEtapasEnsino,
}: ModalBodyProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSelectedValue, selectedValue } = useSelectedValue();
  const [situacoes, setSituacoes] = useState<SituacaoData[]>();
  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<
    { value: number; label: string }[]
  >([]);

  const ultimaAtualizacao = new Date();

  const chamarSituacao = async () => {
    const situacoes = await fetchSituacao();
    setSituacoes(situacoes);
  };

  const openDropdown = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    await chamarSituacao();
  };

  const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateTelefone(event.target.value);
  };

  const handleSituacaoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.currentTarget.value);
  };

  const handleObservacaoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateObservacao(event.target.value);
  };

  const handleLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateLatitude(event.target.value);
  };

  const handleLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateLongitude(event.target.value);
  };

  const handleNumAlunosChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateNumAlunos(Number(event.target.value));
  };

  const handleNumDocentesChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateNumDocentes(Number(event.target.value));
  };

  const handleEtapasDeEnsinoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateEtapasEnsino(event);
  };

  const getEtapasDeEnsino = async () => {
    console.log("error");
    try {
      const resposta = await fetchEtapasDeEnsino();
      const etapas = resposta.map((e) => ({ label: e.descricao, value: e.id }));
      setOpcoesEtapasDeEnsino(etapas);
    } catch (error) {}
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
            value={data.codigoEscola}
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
            placeholder={data.descricaoRede}
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
            placeholder={data.siglaUf}
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
            placeholder={data.nomeMunicipio}
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
            placeholder={data.endereco}
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
            placeholder={data.telefone}
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
            placeholder={data.cep}
            disabled
          />
          <div className="br-select">
            <label htmlFor="select-multtiple">Etapas de Ensino</label>
            <Select
              mode="multiple"
              placeholder={Object.values(data.etapaEnsino)}
              onChange={handleEtapasDeEnsinoChange}
              onMouseDown={getEtapasDeEnsino}
              onClick={getEtapasDeEnsino}
              options={OpcoesEtapasDeEnsino}
              className="select-etapas"
              showSearch={false}
              data-testid="buscar-etapas"
            />
          </div>
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
            placeholder={selectedValue ? selectedValue : data.descricaoSituacao}
          />
          <div className="alinhar-botoes">
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
        {isDropdownOpen && situacoes && (
          <Dropdown
            onClose={openDropdown}
            onClick={setSelectedValue}
            situacoes={situacoes}
            descricao={data.descricaoSituacao}
          />
        )}
        <label htmlFor="input-default">Localização</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-map" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={data.descricaoLocalizacao}
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
            placeholder={data.latitude}
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
            placeholder={data.longitude}
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
            placeholder={data.numeroTotalDeAlunos.toString()}
            onChange={handleNumAlunosChange}
          />
        </div>
        <label htmlFor="input-default">Número total de docentes</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-users" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            placeholder={data.numeroTotalDeDocentes.toString()}
            onChange={handleNumDocentesChange}
          />
        </div>

        <label htmlFor="input-default">Observação</label>
        <div className="input-group">
          <div className="input-icon">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
          </div>
          <input
            id="input-default"
            type="text"
            onChange={handleObservacaoChange}
            placeholder={data.observacao}
          />
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
