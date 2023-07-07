import React, { useEffect, useState } from "react";
import { Form, Input, Space, notification, Select } from "antd";
import ButtonComponent from "../Button";
import { fetchEscolasInep } from "../../service/inepAPI";
import fetchMunicipio from "../../service/municipio";
import fetchFederativeUnit from "../../service/federativeUnit";
import fetchEtapasDeEnsino from "../../service/etapasDeEnsino";
import fetchSolicitaAcao from "../../service/solicitaAcao";
import { EtapasDeEnsino, FederativeUnit, Municipio, SolicitacaoDeAcao } from "../../models/service";
import "../../styles/form.css";


const { Option } = Select;


interface EscolaInepData {
  cod: number;
  estado: string;
  nome: string;
}



const SolicitacaoAcaoForm: React.FC = () => {

  const [UFs, setUFs] = useState<FederativeUnit[] | false>(false);
  const [UFAtual, setUFATual] = useState<FederativeUnit | false>(false);

  const [municipios, setMunicipios] = useState<Municipio[] | false>(false);
  const [municipioAtual, setMunicipioAtual] = useState<Municipio | false>(false);

  const [escolasInep, setEscolasInep] = useState<EscolaInepData[] | false>(false);

  const [etapasDeEnsino, setEtapasDeEnsino] = useState<EtapasDeEnsino[] | false>(false)


  const getEtapasDeEnsino = async () => {
    try {
      const result = await fetchEtapasDeEnsino();
      setEtapasDeEnsino(result)
    } catch (error) {
      console.log({ error })

    }
  }
  const getUFs = async () => {
    try {
      const result = await fetchFederativeUnit();
      console.log({ result })
      setUFs(result)
    } catch (error) {
      console.log({ error })

    }
  }
  const getMunicipios = async () => {
    if (UFAtual)
      try {
        const result = await fetchMunicipio(UFAtual.id);
        setMunicipios(result)
      } catch (error) {
        console.log({ error })
      }
  }

  const getEscolasInep = async () => {
    if (UFAtual && municipioAtual)
      try {
        const result = await fetchEscolasInep(municipioAtual.id)
        setEscolasInep(result);
      } catch (error) {
        console.log({ error })
      }

  }

  const enviarSolicitacao = async (formData: SolicitacaoDeAcao) => {
    try {
      await fetchSolicitaAcao(formData as SolicitacaoDeAcao)
    } catch (error) {
      console.log(error)
    }
  }


  // Busca as unidades federativas, caso já não as tenha buscado.
  useEffect(() => { if (!UFs || UFs.length <= 0) getUFs(); getEtapasDeEnsino(); })

  // Quando muda a unidade federativa selecionada:
  // // - Limpa as opções de municipio
  // // - Caso exista unidade federativa selecionada, busca os municipios desta.   
  useEffect(() => {
    setMunicipioAtual(false);
    getMunicipios();
  }, [UFAtual])


  // Quando municipio é selecionado, busca as escolas do mesmo.
  useEffect(() => {
    setEscolasInep(false);
    if (UFAtual && municipioAtual)
      getEscolasInep()
  }, [municipioAtual])


  const [form] = Form.useForm();



  const [api, contextHolder] = notification.useNotification();



  const rules = [
    {
      required: true,
      message: "Por favor, preencha o campo ${name}!",

    },
  ];

  const emailRule = {

    required: true,
    type: "email",
    message: "Digite um email valido!",
  };


  const [quantiaDeAlunos, setQuantiaDeAlunos] = useState("")
  const handleNumeroDeAlunos = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const regex=^[1-9][0-9]*$
    const result = event.target.value.replace(/[^1-9][^0-9]*$/gi, '');
    setQuantiaDeAlunos(result);
    // console.log(result)



  }


  const onFinish = async (values: any) => {

    const formData = {
      Escola: JSON.parse(values.escola).nome,
      UF: (UFAtual && UFAtual.sigla),
      Municipio: (municipioAtual && municipioAtual.nome),
      NomeSolicitante: values.nome,
      VinculoEscola: values.vinculo,
      Email: values.email,
      Telefone: values.telefone,
      CiclosEnsino: values.ciclos.map((vinculo: string) => JSON.parse(vinculo).descricao),
      QuantidadeAlunos: parseInt(values.quantidade),
      Observacoes: values.observacoes,
    }
    console.log({ formData });
    enviarSolicitacao(formData as SolicitacaoDeAcao)

    // const cadastroData = {
    //   escola: values.escola,
    //   nome: values.nome,
    //   vinculo: values.vinculo,
    //   email: values.email,
    //   telefone: values.telefone,
    //   ciclos: values.ciclos,
    //   quantidade: values.quantidade,
    //   observacoes: values.observacoes,
    // };
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
          <Form.Item name="UF" label="UF" rules={rules}>

            <Select
              placeholder="Selecione uma UF"
              className="inputForm form-item-select"
              onChange={(value) => {
                form.resetFields(["Municipios", "escola"])
                setUFATual(JSON.parse(value));
              }}
              showSearch
            >
              {UFs && UFs.map((UF) => {
                return (
                  <Option key={UF.sigla} value={JSON.stringify(UF)}>{UF.nome}</Option>
                )
              })}

            </Select>
          </Form.Item>

          <Form.Item name="Municipios" label="Municipios" rules={rules}>
            <Select
              placeholder={
                !UFAtual ?
                  "Nenhuma UF selecionada" :
                  !municipios ?
                    "Carregando municipios..." : "Selecione um municipio"}
              className="inputForm form-item-select"
              disabled={!UFAtual}
              showSearch
              onChange={(value) => {
                form.resetFields(["escola"])
                setMunicipioAtual(JSON.parse(value))
              }}
            >
              {municipios && municipios.map((municipio) => {
                return (
                  <Option key={JSON.stringify(municipio)} value={JSON.stringify(municipio)}>{municipio.nome}</Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item name="escola" label="Escola" rules={rules}>

            <Select
              placeholder={
                !municipioAtual ?
                  "Nenhum municipio selecionado" :
                  !escolasInep ?
                    "Carregando escolas..." :
                    "Selecione uma escola"}
              className="inputForm form-item-select"
              disabled={!municipioAtual || !escolasInep}
              loading={!escolasInep && municipioAtual !== false}


              showSearch

            >
              {escolasInep && escolasInep.map((escola: EscolaInepData) => <Option key={escola.cod} value={JSON.stringify(escola).toLowerCase()}>{escola.nome}</Option>)}

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
              <Option value="Professor">Professor</Option>
              <Option value="Gestor escolar">Gestor escolar</Option>
              <Option value="Estudante">Estudante</Option>
              <Option value="Outro">Outro</Option>


            </Select>
          </Form.Item>

          <Form.Item name="email" label="E-mail"
            rules={
              [
                { required: true, message: "Por favor, preencha o campo email!" },
                {
                  pattern: new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)*$"),
                  message: "Escreva um email valido.",
                },
              ]}>
            <Input
              className="inputForm"
            />
          </Form.Item>

          <Form.Item name="telefone" label="Telefone" rules={
            [
              { required: true, message: "Por favor, preencha seu telefone!" },
              {
                pattern: new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)*$"),
                message: "Escreva numero de telefone valido.",
              },
            ]
          }>
            <Input className="inputForm"
              // type="tel"
              // min="0"
              type="text"
            // min="0"
            // pattern="^[0-9+]"
            />
          </Form.Item>

          <Form.Item name="ciclos" label="Ciclos de Ensino" rules={rules}>
            <Select
              mode="multiple"
              placeholder="Selecione uma escola"
              className="inputForm form-item-select"
              loading={!etapasDeEnsino}
            >
              {etapasDeEnsino && etapasDeEnsino.map((etapa: EtapasDeEnsino) => <Option key={etapa.id} value={JSON.stringify(etapa).toLowerCase()}>{etapa.descricao}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item
            name="quantidade"
            label="Quantidade de Alunos"
            rules={rules}>
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
                nome="Enviar solicitação"
                cor="#1351B4"
                cor_letra="#FFFFFF"
                cor_borda="#1351B4"
                largura="25em"
              />
            </Space>
          </Form.Item>
        </Form>
        <a href="" className="politica">Política de privacidade</a>
        <a href="" className="ajuda">Precisa de ajuda?</a>
      </div>
    </div>
  );
};

export default SolicitacaoAcaoForm;

