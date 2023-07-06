import { Button, Form, Input, Select, Space, notification, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchEtapasDeEnsino from "../../../service/etapasDeEnsino";
import fetchFederativeUnit from "../../../service/federativeUnit";
import fetchMunicipio from "../../../service/municipio";
import fetchCadastroEscola from "../../../service/registerSchool";
import fetchCEP from "../../../service/viaCEP";
import "../../../styles/form/step2.css";
import { useFiltroTabela } from "../../../context/FiltroTabela";
import { FederativeUnit, Municipio } from "../../../models/service";

const { Option } = Select;
interface Step2Props {
  onClickBack: () => void;
}
export default function Step2({ onClickBack }: Step2Props) {

  const {
    UFSelecionada,
    setUFSelecionada,

    carregandoEscolas,
  } = useFiltroTabela();

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [erroCEP, setErroCEP] = useState(false);
  let cepEnviado = "0";
  const rules = [
    {
      required: true,
      message: "Preencha o campo ${label}!",
    },
  ];
  const rulesLatitude = [
    {
      required: false,
      pattern: /^-?([1-8]?\d|90)(,\d{1,7})?$/,
      message:
        "Deve estar entre -90 e +90 e até 7 casas decimais, utilizando vírgula!",
    },
  ];

  const rulesLongitude = [
    {
      required: false,
      pattern: /^-?((1?[0-7]|[0-9])?\d|180)(,\d{1,7})?$/,
      message:
        "Deve estar entre -180 e +180 e até 7 casas decimais, utilizando vírgula!",
    },
  ];

  const rulesCodigoEscola = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "O código deve conter 8 digitos",
    },
  ];

  const rulesTelefone = [
    {
      required: true,
      pattern: /^\d{10,11}$/,
      message: "O telefone deve conter DDD + 9 ou 8 digitos",
    },
  ];

  const rulesNumeroAlunoDocentes = [
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: "Deve conter apenas números",
    },
  ];

  const rulesCEP = [
    {
      required: true,
      pattern: /^\d{8}$/,
      message: "CEP inválido"
    },
  ];

  const [opcoesMunicipio, setOpcoesMunicipio] = useState<Municipio[]>([]);
  const getMunicipio = async () => {
    try {
      if (UFSelecionada) {
        const resposta = await fetchMunicipio(UFSelecionada.id);
        setOpcoesMunicipio(resposta);
       
      }
    } catch (error) {
     
    }
  };

  const [opcoesUf, setOpcoesUf] = useState<FederativeUnit[]>([]);
  const getUf = async () => {
    try {
      const resposta = await fetchFederativeUnit();
      setOpcoesUf(resposta);
     
    } catch (error) { }

  };
  useEffect(() => {
    if (opcoesUf.length == 0) getUf();
  });

  const handleOptionClick = (option: any) => {
    setUFSelecionada(option);

  };

  const getCEP = async (cep: string) => {
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
    } catch (error) { }
  };


  const getEtapasDeEnsino = async () => {
    try {
      const resposta = await fetchEtapasDeEnsino();
      const etapas = resposta.map((e) => ({ label: e.descricao, value: e.id }));
      setOpcoesEtapasDeEnsino(etapas);
    } catch (error) { }
  };

  const [OpcoesEtapasDeEnsino, setOpcoesEtapasDeEnsino] = useState<
    { value: number; label: string }[]
  >([]);

  const limpaMunicipio = () =>{
    form.setFieldValue('municipio', undefined)
  };

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const uf = await fetchFederativeUnit();
    const ufFiltrada = uf.filter((uf) => uf.sigla === values.uf);

    let municipioFiltrado;
    if (ufFiltrada.length>0) {
  
      const municipio = await fetchMunicipio(ufFiltrada[0].id);
      municipioFiltrado = municipio.filter(
        (municipio) => municipio.nome === values.municipio
      );
    }

    if (!values.latitude) {
      values.latitude = '0'
    }

    if (!values.longitude) {
      values.longitude = '0'
    }

    const registerSchoolData = {
      NomeEscola: values.nome,
      IdRede: values.rede,
      CodigoEscola: values.codigo,
      IdUf: ufFiltrada ? (ufFiltrada[0]?.id || values.uf) : values.uf,
      Cep: cepEnviado,
      Telefone: values.telefone,
      IdEtapasDeEnsino: values.ciclos,
      IdPorte: values.porte,
      Endereco: values.endereco,
      IdMunicipio: municipioFiltrado ? (municipioFiltrado[0]?.id || values.municipio) : values.municipio,
      IdLocalizacao: values.localizacao,
      Longitude: values.longitude,
      Latitude: values.latitude,
      NumeroTotalDeAlunos: values.numeroAlunos,
      NumeroTotalDeDocentes: values.numeroDocentes,
    };

    try {
      await fetchCadastroEscola(registerSchoolData);
      notification.success({ message: "Cadastro feito!" });
      navigate("/escolas-cadastradas");
    } catch (error) {
      api.error({ message: "Erro ao fazer o cadastro" });
    }
  };
  return (
    <div>
      {contextHolder}
      <h2>Cadastrar Escola</h2>
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
            <Form.Item name="nome" label="Nome da Escola" rules={rules}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="rede" label="Rede" rules={rules}>
              <Select>
                <Option value={1}>Municipal</Option>
                <Option value={2}>Estadual</Option>
                <Option value={3}>Privada</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="codigo"
              label="Codigo da Escola"
              rules={rulesCodigoEscola}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="cep" label="CEP" rules={rulesCEP}>
              <Input
                className="inputForm2"
                onChange={(event) => {
                  getCEP(event.target.value);
                }}
              />
            </Form.Item>

            <Form.Item name="uf" rules={rules} label="UF">
              <Select
                onChange={limpaMunicipio}
                disabled={erroCEP}
                onMouseDown={getUf}
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
            <Form.Item name="telefone" label="Telefone" rules={rulesTelefone}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="ciclos" label="Etapas de Ensino" rules={rules}>
              <Select
                mode="multiple"
                onClick={getEtapasDeEnsino}
                options={OpcoesEtapasDeEnsino}
                onMouseDown={getEtapasDeEnsino}
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

            <Form.Item name="porte" label="Porte" rules={rules}>
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
            <Form.Item name="endereco" label="Endereço" rules={rules}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="municipio" label="Município" rules={rules}>
              <Select
                disabled={erroCEP}
                notFoundContent={<p>Carregando...</p>}
                placement="bottomRight"
                optionLabelProp="label"
                className="uf"
                onMouseDown={getMunicipio}
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
            <Form.Item name="localizacao" label="Localização" rules={rules}>
              <Select>
                <Option value={1}>Rural</Option>
                <Option value={2}>Urbana</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="longitude"
              label="Longitude"
              rules={rulesLongitude}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item name="latitude" label="Latitude" rules={rulesLatitude}>
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item
              name="numeroAlunos"
              label="Número Total de Alunos"
              rules={rulesNumeroAlunoDocentes}
            >
              <Input className="inputForm2" />
            </Form.Item>

            <Form.Item
              name="numeroDocentes"
              label="Número Total de Docentes"
              rules={rulesNumeroAlunoDocentes}
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
