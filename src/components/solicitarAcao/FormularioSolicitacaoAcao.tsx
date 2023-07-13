import { Form, Input, Select, Space, notification } from "antd";
import React, { useState } from "react";
import {
  EtapasDeEnsinoData,
  UnidadeFederativaData,
  MunicipioData,
  SolicitacaoDeAcaoData,
} from "../../models/service";
import fetchEtapasDeEnsino from "../../service/etapasDeEnsino";
import fetchFederativeUnit from "../../service/unidadesFederativas";
import { fetchEscolasInep } from "../../service/inepAPI";
import fetchMunicipio from "../../service/municipio";
import fetchSolicitaAcao from "../../service/solicitarAcao";
import "../../styles/form.css";
import ButtonComponent from "../Button";

const { Option } = Select;

interface EscolaInepData {
  cod: number;
  estado: string;
  nome: string;
}

const SolicitacaoAcaoForm: React.FC = () => {
  const [botaoEnviarDisponivel, setBotaoEnviarDisponivel] = useState(true);

  const [UFs, setUFs] = useState<UnidadeFederativaData[] | false>(false);
  const [UFAtual, setUFATual] = useState<UnidadeFederativaData | false>(false);

  const [municipios, setMunicipios] = useState<MunicipioData[] | false>(false);
  const [municipioAtual, setMunicipioAtual] = useState<MunicipioData | false>(
    false
  );

  const [escolasInep, setEscolasInep] = useState<EscolaInepData[] | false>(
    false
  );

  const [etapasDeEnsino, setEtapasDeEnsino] = useState<
    EtapasDeEnsinoData[] | false
  >(false);

  const getEtapasDeEnsino = async () => {
    if (!etapasDeEnsino)
      try {
        const result = await fetchEtapasDeEnsino();
        setEtapasDeEnsino(result);
      } catch (error) {}
  };
  const getUFs = async () => {
    if (!UFs)
      try {
        const result = await fetchFederativeUnit();
        setUFs(result);
      } catch (error) {}
  };
  const getMunicipios = async () => {
    if (UFAtual)
      try {
        const result = await fetchMunicipio(UFAtual.id);
        setMunicipios(result);
      } catch (error) {}
  };

  const getEscolasInep = async () => {
    if (UFAtual && municipioAtual)
      try {
        const result = await fetchEscolasInep(municipioAtual.id);
        setEscolasInep(result);
      } catch (error) {}
  };

  const enviarSolicitacao = async (formData: SolicitacaoDeAcaoData) => {
    try {
      setBotaoEnviarDisponivel(false);
      await fetchSolicitaAcao(formData);
      notification.success({ message: "Solicitação enviada com sucesso!" });
      setBotaoEnviarDisponivel(true);
    } catch (error) {
      notification.error({ message: "Não foi possivel enviar solicitação." });
      setBotaoEnviarDisponivel(true);
    }
  };

  const [form] = Form.useForm();

  const limpaMunicipio = () => {
    setMunicipioAtual(false);
    setMunicipios(false);
    form.setFieldValue("Municipios", undefined);
  };
  const limpaEscola = () => {
    setEscolasInep(false);
    form.setFieldValue("escola", undefined);
  };

  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",
    },
  ];

  const onFinish = async (values: any) => {
    const formData = {
      Escola: JSON.parse(values.escola).nome,
      UF: UFAtual && UFAtual.nome,
      Municipio: municipioAtual && municipioAtual.nome,
      NomeSolicitante: values.nome,
      VinculoEscola: values.vinculo,
      Email: values.email,
      Telefone: values.telefone,
      CiclosEnsino: values.ciclos.map(
        (vinculo: string) => JSON.parse(vinculo).descricao
      ),
      QuantidadeAlunos: parseInt(values.quantidade),
      Observacoes: values.observacoes,
    };
    enviarSolicitacao(formData as SolicitacaoDeAcaoData);
  };

  return (
    <div className="formc">
      <div>
        <h2>Solicitação ação ao DNIT</h2>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark="optional"
          className="form-email"
        >
          <div className="uf-municipio-container">
            <Form.Item
              name="UF"
              label="UF"
              rules={rules}
              className="dropdown-uf"
            >
              <Select
                optionLabelProp="label"
                notFoundContent={<p>Carregando...</p>}
                onChange={limpaMunicipio}
                placeholder="Selecione uma UF"
                className="inputForm"
                data-testid="select-uf"
                onMouseDown={getUFs}
                showSearch
              >
                {UFs &&
                  UFs.map((UF) => {
                    return (
                      <Option
                        key={UF.id}
                        label={<>{UF.nome}</>}
                        data-testid={"uf"}
                      >
                        <button
                          onClick={() => setUFATual(UF)}
                          className="option-municipio"
                        >
                          {UF.nome}
                        </button>
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <Form.Item name="Municipios" label="Municipios" rules={rules}>
              <Select
                notFoundContent={<p>Carregando...</p>}
                placeholder={
                  !UFAtual ? "Nenhuma UF selecionada" : "Selecione um municipio"
                }
                className="inputForm form-item-select"
                disabled={!UFAtual}
                optionLabelProp="label"
                showSearch
                onChange={limpaEscola}
                onMouseDown={getMunicipios}
              >
                {municipios &&
                  municipios.map((municipio) => {
                    return (
                      <Option key={municipio.id} label={<>{municipio.nome}</>}>
                        <button
                          onClick={() => setMunicipioAtual(municipio)}
                          className="option-municipio"
                        >
                          {municipio.nome}
                        </button>
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="escola" label="Escola" rules={rules}>
            <Select
              className="inputForm form-item-select"
              placeholder={
                !municipioAtual
                  ? "Nenhum municipio selecionado"
                  : "Selecione uma escola"
              }
              onMouseDown={getEscolasInep}
              disabled={!municipioAtual}
              loading={!escolasInep && municipioAtual !== false}
              notFoundContent={<p>Carregando...</p>}
              showSearch
            >
              {escolasInep &&
                escolasInep.map((escola: EscolaInepData) => (
                  <Option
                    key={escola.cod}
                    value={JSON.stringify(escola).toLowerCase()}
                    label={<>{escola.nome}</>}
                  >
                    {escola.nome}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="nome" label="Nome do Solicitante" rules={rules}>
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item name="vinculo" label="Vínculo com a Escola" rules={rules}>
            <Select
              placeholder="Selecione seu vinculo"
              className="inputForm form-item-select"
            >
              <Option value="Professor" data-testid="Professor">
                Professor
              </Option>
              <Option value="Gestor escolar">Gestor escolar</Option>
              <Option value="Estudante">Estudante</Option>
              <Option value="Outro">Outro</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: "Por favor, preencha o campo email!" },
              {
                pattern: /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+){1,3}$/,
                message: "Escreva um email valido.",
              },
            ]}
          >
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[
              { required: true, message: "Por favor, preencha seu telefone!" },
            ]}
          >
            <Input className="inputForm" type="text" />
          </Form.Item>

          <Form.Item name="ciclos" label="Ciclos de Ensino" rules={rules}>
            <Select
              mode="multiple"
              placeholder="Selecione os ciclos de ensino da escola"
              className="select-etapas-acao"
              loading={!etapasDeEnsino}
              onMouseDown={getEtapasDeEnsino}
              notFoundContent={<p>Carregando...</p>}
            >
              {etapasDeEnsino &&
                etapasDeEnsino.map((etapa: EtapasDeEnsinoData) => (
                  <Option
                    data-testid="etapas-de-ensino"
                    key={etapa.id}
                    value={JSON.stringify(etapa).toLowerCase()}
                  >
                    {etapa.descricao}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantidade"
            label="Quantidade de Alunos"
            rules={rules}
          >
            <Input
              className="inputForm"
              type="number"
              min="0"
              pattern="^[1-9][0-9]*"
            />
          </Form.Item>

          <Form.Item name="observacoes" label="Observações">
            <Input className="inputForm" />
          </Form.Item>

          <Form.Item>
            <Space>
              <ButtonComponent
                data-testid="Enviar"
                nome="Enviar solicitação"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="25em"
                disabled={!botaoEnviarDisponivel}
              />
            </Space>
          </Form.Item>
        </Form>
        <a href="" className="politica">
          Política de privacidade
        </a>
        <a href="" className="ajuda">
          Precisa de ajuda?
        </a>
      </div>
    </div>
  );
};

export default SolicitacaoAcaoForm;
