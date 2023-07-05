import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "https://api.dnit-eps-mds.com/api/escolas/obter",
    (req, res, ctx) => {
      return res(
        ctx.json({
          pagina: 1,
          escolasPorPagina: 5,
          totalEscolas: 29,
          totalPaginas: 6,
          escolas: [
            {
              idEscola: 227,
              codigoEscola: 41127226,
              nomeEscola: "Escola A",
              idRede: 1,
              cep: "82860130",
              idUf: 1,
              descricaoUf: "Acre",
              endereco:
                "RUA JOAO BATISTA SCUCATO, 80 ATUBA. 82860-130 Curitiba - PR.",
              idMunicipio: 5200050,
              nomeMunicipio: "Abadia de Goiás",
              idLocalizacao: 1,
              longitude: "-49,2011",
              latitude: "-25,38443",
              etapaEnsino: {},
              numeroTotalDeAlunos: 200,
              idSituacao: 1,
              descricaoSituacao: "Escola Crítica",
              idPorte: 1,
              telefone: "32562393",
              numeroTotalDeDocentes: 200,
              siglaUf: "AC",
            },
            {
              idEscola: 224,
              codigoEscola: 41127226,
              nomeEscola: "ANISIO TEIXEIRA E M EF",
              idRede: 1,
              cep: "82860130",
              idUf: 1,
              descricaoUf: "Acre",
              endereco:
                "RUA JOAO BATISTA SCUCATO, 80 ATUBA. 82860-130 Curitiba - PR.",
              idMunicipio: 5200050,
              nomeMunicipio: "Abadia de Goiás",
              idLocalizacao: 1,
              longitude: "-49,2011",
              latitude: "-25,38443",
              etapaEnsino: {
                "4": "Educação de Jovens Adultos",
                "5": "Educação Profissional",
              },
              numeroTotalDeAlunos: 200,
              idSituacao: 1,
              descricaoSituacao: "Escola Crítica",
              idPorte: 1,
              telefone: "32562393",
              numeroTotalDeDocentes: 200,
              siglaUf: "AC",
            },
            {
              idEscola: 225,
              codigoEscola: 11116,
              nomeEscola: "ANTAO LEANDRO BITU EEF",
              idRede: 1,
              cep: "CEP007",
              idUf: 2,
              descricaoUf: "Alagoas",
              endereco: "Endereço E",
              idMunicipio: 5200050,
              nomeMunicipio: "Abadia de Goiás",
              idLocalizacao: 1,
              longitude: "56",
              latitude: "-25,38443",
              etapaEnsino: {},
              numeroTotalDeAlunos: 140,
              idSituacao: 4,
              descricaoSituacao: "Escola Crítica",
              idPorte: 2,
              telefone: "40028922",
              numeroTotalDeDocentes: 16,
              siglaUf: "AL",
            },
          ],
        })
      );
    }
  ),
  rest.get(
    "https://api.dnit-eps-mds.com/api/dominio/unidadeFederativa",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            nome: "Acre",
            id: 1,
            sigla: "AC",
          },
          {
            nome: "Alagoas",
            id: 2,
            sigla: "AL",
          },
          {
            nome: "Amapá",
            id: 3,
            sigla: "AP",
          },
          {
            nome: "Amazonas",
            id: 4,
            sigla: "AM",
          },
          {
            nome: "Bahia",
            id: 5,
            sigla: "BA",
          },
          {
            nome: "Ceará",
            id: 6,
            sigla: "CE",
          },
          {
            nome: "Distrito Federal",
            id: 27,
            sigla: "DF",
          },
          {
            nome: "Espírito Santo",
            id: 7,
            sigla: "ES",
          },
          {
            nome: "Goiás",
            id: 8,
            sigla: "GO",
          },
          {
            nome: "Maranhão",
            id: 9,
            sigla: "MA",
          },
          {
            nome: "Mato Grosso",
            id: 10,
            sigla: "MT",
          },
          {
            nome: "Mato Grosso do Sul",
            id: 11,
            sigla: "MS",
          },
          {
            nome: "Minas Gerais",
            id: 12,
            sigla: "MG",
          },
          {
            nome: "Pará",
            id: 13,
            sigla: "PA",
          },
          {
            nome: "Paraíba",
            id: 14,
            sigla: "PB",
          },
          {
            nome: "Paraná",
            id: 15,
            sigla: "PR",
          },
          {
            nome: "Pernambuco",
            id: 16,
            sigla: "PE",
          },
          {
            nome: "Piauí",
            id: 17,
            sigla: "PI",
          },
          {
            nome: "Rio de Janeiro",
            id: 18,
            sigla: "RJ",
          },
          {
            nome: "Rio Grande do Norte",
            id: 19,
            sigla: "RN",
          },
          {
            nome: "Rio Grande do Sul",
            id: 20,
            sigla: "RS",
          },
          {
            nome: "Rondônia",
            id: 21,
            sigla: "RO",
          },
          {
            nome: "Roraima",
            id: 22,
            sigla: "RR",
          },
          {
            nome: "Santa Catarina",
            id: 23,
            sigla: "SC",
          },
          {
            nome: "São Paulo",
            id: 24,
            sigla: "SP",
          },
          {
            nome: "Sergipe",
            id: 25,
            sigla: "SE",
          },
          {
            nome: "Tocantins",
            id: 26,
            sigla: "TO",
          },
        ])
      );
    }
  ),
  rest.get(
    "https://api.dnit-eps-mds.com/api/dominio/situacao",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 4,
            descricao: "Escola Crítica",
          },
          {
            id: 1,
            descricao: "Indicação",
          },
          {
            id: 3,
            descricao: "Jornada de crescimento do professor",
          },
          {
            id: 2,
            descricao: "Solicitação da escola",
          },
        ])
      );
    }
  ),
  rest.get(
    "https://api.dnit-eps-mds.com/api/dominio/etapasDeEnsino",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 4,
            descricao: "Educação de Jovens Adultos",
          },
          {
            id: 1,
            descricao: "Educação Infantil",
          },
          {
            id: 5,
            descricao: "Educação Profissional",
          },
          {
            id: 2,
            descricao: "Ensino Fundamental",
          },
          {
            id: 3,
            descricao: "Ensino Médio",
          },
        ])
      );
    }
  ),
  rest.delete(
    "https://api.dnit-eps-mds.com/api/escolas/excluir",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
  rest.get(
    "https://api.dnit-eps-mds.com/api/dominio/municipio",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            nome: "Acrelândia",
            id: 1200013,
          },
          {
            nome: "Assis Brasil",
            id: 1200054,
          },
          {
            nome: "Brasiléia",
            id: 1200104,
          },
          {
            nome: "Bujari",
            id: 1200138,
          },
          {
            nome: "Caririaçu",
            id: 1200179,
          },
          {
            nome: "Cruzeiro do Sul",
            id: 1200203,
          },
          {
            nome: "Epitaciolândia",
            id: 1200252,
          },
          {
            nome: "Feijó",
            id: 1200302,
          },
          {
            nome: "Jordão",
            id: 1200328,
          },
          {
            nome: "Mâncio Lima",
            id: 1200336,
          },
          {
            nome: "Manoel Urbano",
            id: 1200344,
          },
          {
            nome: "Marechal Thaumaturgo",
            id: 1200351,
          },
          {
            nome: "Plácido de Castro",
            id: 1200385,
          },
          {
            nome: "Porto Acre",
            id: 1200807,
          },
          {
            nome: "Rio Branco",
            id: 1200401,
          },
          {
            nome: "Rodrigues Alves",
            id: 1200427,
          },
          {
            nome: "Santa Rosa do Purus",
            id: 1200435,
          },
          {
            nome: "Senador Guiomard",
            id: 1200450,
          },
          {
            nome: "Sena Madureira",
            id: 1200500,
          },
          {
            nome: "Tarauacá",
            id: 1200609,
          },
          {
            nome: "Xapuri",
            id: 1200708,
          },
        ])
      );
    }
  ),
  rest.post(
    "https://api.dnit-eps-mds.com/api/escolas/adicionarSituacao",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    "https://api.dnit-eps-mds.com/api/escolas/removerSituacao",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    "https://api.dnit-eps-mds.com/api/escolas/cadastrarEscola",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    "https://api.dnit-eps-mds.com/api/escolas/cadastrarEscolaPlanilha",
    (req, res, ctx) => {
      return res(ctx.json([2, 3]));
    }
  ),
  rest.get("https://viacep.com.br/ws/12345678/json", (req, res, ctx) => {
    return res(
      ctx.json({
        cep: "12345-678",
        logradouro: "SHA Conjunto Chácara",
        complemento: "",
        bairro: "Setor Habitacional Arniqueira (Águas Claras)",
        localidade: "Acrelândia",
        uf: "AC",
        ibge: "5300108",
        gia: "",
        ddd: "61",
        siafi: "9701",
      })
    );
  })
);

export default server;
