import { Button, Form, Input, Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFiltroTabela } from "../../../context/FiltroTabela";
import { UnidadeFederativaData, MunicipioData } from "../../../models/service";
import "./styles.css";
import { fetchEtapasDeEnsino } from "../../../service/escolaApi";
import {fetchUnidadeFederativa} from "../../../service/escolaApi";
import {fetchMunicipio} from "../../../service/escolaApi";
import {fetchCEP} from "../../../service/apiUtils";
import { fetchCadastraEscola } from "../../../service/escolaApi";

const { Option } = Select;
interface Step2Props {
  onClickBack: () => void;
}
export default function CadastroManual({ onClickBack }: Step2Props) {
  const { UFSelecionada, setUFSelecionada } = useFiltroTabela();

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [erroCEP, setErroCEP] = useState(false);
  let cepEnviado = "0";
  const regras = [
    {
      required: true,
      message: "Preencha o campo ${label}!",
    },
  ];
  const regrasLatitude = [
    {
      required: false,
      pattern: /^-?([1-8]?\d|90)(.\d{1,15})?$/,
      message: "Deve estar entre -90 e +90 e até 15 decimais, utilizando ponto",
    },
  ];

  const regrasLongitude = [
    {
      required: false,
      pattern: /^-?((1?[0-7]|[0-9])?\d|180)(.\d{1,15})?$/,
      message:
        "Deve estar entre -180 e +180 e até 15 decimais, utilizando ponto",
    },
  ];

  const regrasCodigoEscola = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "O código deve conter 8 digitos",
    },
  ];

  const regrasTelefone = [
    {
      required: true,
      pattern: /^\d{10,11}$/,
      message: "O telefone deve conter DDD + 9 ou 8 digitos",
    },
  ];

  const regrasNumeroAlunoDocentes = [
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: "Deve conter apenas números",
    },
  ];

  const regrasCEP = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "CEP inválido",
    },
  ];

  const [opcoesMunicipio, setOpcoesMunicipio] = useState<MunicipioData[]>([]);
  const consultaMunicipio = async () => {
    try {
      if (UFSelecionada) {
        const resposta = await fetchMunicipio(UFSelecionada.id);
        setOpcoesMunicipio(resposta);
      }
    } catch (error) {}
  };

  const [opcoesUf, setOpcoesUf] = useState<UnidadeFederativaData[]>([]);
  const consultaUf = async () => {
    try {
      const resposta = await fetchUnidadeFederativa();
      setOpcoesUf(resposta);
    } catch (error) {}
  };
  useEffect(() => {
    if (opcoesUf.length == 0) consultaUf();
  });

  const handleOptionClick = (option: any) => {
    setUFSelecionada(option);
  };

  const consultaCEP = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const res = await fetchCEP(cep);
        if (res.erro) {
          setErroCEP(false);
          form.setFields([
            {
              name: "cep",
              errors: ["CEP não encontrado"],
            },
          ]);
          cepEnviado = "0";
        } else {
          setErroCEP(true);
          form.setFieldsValue({
            endereco: res.logradouro,
            municipio: res.localidade,
            uf: res.uf,
          });
          cepEnviado = cep;
        }
      } else {
        setErroCEP(false);
      }
    } catch (error) {}
  };

  const consultaEtapasDeEnsino = async () => {
    try {
      const resposta = await fetchEtapasDeEnsino();
      const etapas = resposta.map((e) => ({ label: e.descricao, value: e.id }));
      setOpcoesEtapasDeEnsino(etapas);
    } catch (error) {}
  };

  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<
    { value: number; label: string }[]
  >([]);

  const limpaMunicipio = () => {
    form.setFieldValue("municipio", undefined);
  };

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const uf = await fetchUnidadeFederativa();
    const ufFiltrada = uf.filter((uf) => uf.sigla === values.uf);

    let municipioFiltrado;
    if (ufFiltrada.length > 0) {
      const municipio = await fetchMunicipio(ufFiltrada[0].id);
      municipioFiltrado = municipio.filter(
        (municipio) => municipio.nome === values.municipio
      );
    }

    if (!values.latitude) {
      values.latitude = "0";
    }

    if (!values.longitude) {
      values.longitude = "0";
    }

    const registerSchoolData = {
      NomeEscola: values.nome,
      IdRede: values.rede,
      CodigoEscola: values.codigo,
      IdUf: ufFiltrada ? ufFiltrada[0]?.id || values.uf : values.uf,
      Cep: cepEnviado,
      Telefone: values.telefone,
      IdEtapasDeEnsino: values.ciclos,
      IdPorte: values.porte,
      Endereco: values.endereco,
      IdMunicipio: municipioFiltrado
        ? municipioFiltrado[0]?.id || values.municipio
        : values.municipio,
      IdLocalizacao: values.localizacao,
      Longitude: values.longitude,
      Latitude: values.latitude,
      NumeroTotalDeAlunos: values.numeroAlunos,
      NumeroTotalDeDocentes: values.numeroDocentes,
    };

    try {
      await fetchCadastraEscola(registerSchoolData);
      notification.success({ message: "Cadastro feito!" });
      navigate("/escolas-cadastradas");
    } catch (error) {
      api.error({ message: "Erro ao fazer o cadastro" });
    }
  };
  return (
    <div>
      {contextHolder}
      <h2>Cadastrar EsAcola</h2>
      <Form
        form={form}
        onFinish={onFinish}
        name="form2"
        layout="vertical"
        autoComplete="off"
        className="form-email"
        preserve
      >
        <div className="divScroll">
          <div className="bloco">
            <Form.Item name="nome" label="Nome da Escola" rules={regras}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="rede" label="Rede" rules={regras}>
              <Select>
                <Option value={1}>Municipal</Option>
                <Option value={2}>Estadual</Option>
                <Option value={3}>Privada</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="codigo"
              label="Codigo da Escola"
              rules={regrasCodigoEscola}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="cep" label="CEP" rules={regrasCEP}>
              <Input
                className="inputForm2"
                onChange={(event) => {
                  consultaCEP(event.target.value);
                }}
              />
            </Form.Item>

            <Form.Item name="uf" rules={regras} label="UF">
              <Select
                onChange={limpaMunicipio}
                disabled={erroCEP}
                onMouseDown={consultaUf}
                notFoundContent={<p>Carregando...</p>}
                placement="bottomRight"
                optionLabelProp="label"
                className="uf"
              >
                {opcoesUf?.map((u) => (
                  <Option key={u.id} value={u.id} label={<>{u.nome}</>}>
                    <button
                      onClick={() => handleOptionClick(u)}
                      className="option-municipio"
                    >
                      {u.nome}
                    </button>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="bloco2">
            <Form.Item name="telefone" label="Telefone" rules={regrasTelefone}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="ciclos" label="Etapas de Ensino" rules={regras}>
              <Select
                mode="multiple"
                onClick={consultaEtapasDeEnsino}
                options={OpcoesEtapasDeEnsino}
                onMouseDown={consultaEtapasDeEnsino}
                notFoundContent={<p>Carregando...</p>}
                placement="bottomRight"
                optionLabelProp="label"
                className="select-etapas-cadastro"
                showSearch={false}
              >
                {OpcoesEtapasDeEnsino?.map((u) => (
                  <Option key={u.label} value={u.value} label={<>{u.value}</>}>
                    {u.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="porte" label="Porte" rules={regras}>
              <Select>
                <Option value={1}>Até 50 matrículas de escolarização</Option>
                <Option value={2}>
                  Entre 51 e 200 matrículas de escolarização
                </Option>
                <Option value={3}>
                  Entre 201 e 501 matrículas de escolarização
                </Option>
                <Option value={4}>
                  Entre 501 e 1000 matrículas de escolarização
                </Option>
                <Option value={5}>
                  Mais de 1000 matrículas de escolarização
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name="endereco" label="Endereço" rules={regras}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="municipio" label="Município" rules={regras}>
              <Select
                disabled={erroCEP}
                notFoundContent={<p>Carregando...</p>}
                placement="bottomRight"
                optionLabelProp="label"
                className="uf"
                onMouseDown={consultaMunicipio}
              >
                {opcoesMunicipio?.map((u) => (
                  <Option key={u.id} value={u.id} label={<>{u.nome}</>}>
                    {u.nome}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="bloco3">
            <Form.Item name="localizacao" label="Localização" rules={regras}>
              <Select>
                <Option value={1}>Rural</Option>
                <Option value={2}>Urbana</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="longitude"
              label="Longitude"
              rules={regrasLongitude}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="latitude" label="Latitude" rules={regrasLatitude}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item
              name="numeroAlunos"
              label="Número Total de Alunos"
              rules={regrasNumeroAlunoDocentes}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item
              name="numeroDocentes"
              label="Número Total de Docentes"
              rules={regrasNumeroAlunoDocentes}
            >
              <Input className="inputForm2" />
            </Form.Item>
          </div>
        </div>
        <div className="voltar">
          <Space>
            <Button
              className="button2"
              type="primary"
              size="large"
              shape="round"
              onClick={onClickBack}
            >
              Voltar
            </Button>
          </Space>
        </div>
        <div className="proximo">
          <Space>
            <Button
              className="button2"
              type="primary"
              size="large"
              htmlType="submit"
              shape="round"
            >
              Cadastrar
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}
