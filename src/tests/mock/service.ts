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
          totalEscolas: 13,
          totalPaginas: 3,
          escolas: [
            {
              idEscola: 104,
              codigoEscola: 300,
              nomeEscola: "Escola A",
              idRede: 1,
              descricaoRede: null,
              cep: "CEP001",
              idUf: 1,
              descricaoUf: "Acre",
              endereco: "Endereço A",
              idMunicipio: 2303204,
              nomeMunicipio: "Caririaçu",
              idLocalizacao: 1,
              longitude: "789.012",
              latitude: "123.456",
              idEtapasDeEnsino: 1,
              descricaoEtapasEnsino: null,
              numeroTotalDeAlunos: 100,
              idSituacao: 2,
              descricaoSituacao: "Solicitação da escola",
              idPorte: 1,
              telefone: "Telefone A",
              numeroTotalDeDocentes: 50,
              siglaUf: "AC",
            },
            {
              idEscola: 105,
              codigoEscola: 301,
              nomeEscola: "Escola B",
              idRede: 1,
              descricaoRede: null,
              cep: "CEP002",
              idUf: 2,
              descricaoUf: "Alagoas",
              endereco: "Endereço B",
              idMunicipio: 2303303,
              nomeMunicipio: "Cariús",
              idLocalizacao: 1,
              longitude: "890.123",
              latitude: "234.567",
              idEtapasDeEnsino: 2,
              descricaoEtapasEnsino: null,
              numeroTotalDeAlunos: 200,
              idSituacao: 3,
              descricaoSituacao: "Jornada de crescimento do professor",
              idPorte: 1,
              telefone: "Telefone B",
              numeroTotalDeDocentes: 60,
              siglaUf: "AL",
            },
            {
              idEscola: 110,
              codigoEscola: 301,
              nomeEscola: "Escola G",
              idRede: 1,
              descricaoRede: null,
              cep: "CEP002",
              idUf: 2,
              descricaoUf: "Alagoas",
              endereco: "Endereço B",
              idMunicipio: 1400159,
              nomeMunicipio: "Bonfim",
              idLocalizacao: 1,
              longitude: "890.123",
              latitude: "234.567",
              idEtapasDeEnsino: 2,
              descricaoEtapasEnsino: null,
              numeroTotalDeAlunos: 200,
              idSituacao: 3,
              descricaoSituacao: "Jornada de crescimento do professor",
              idPorte: 1,
              telefone: "Telefone B",
              numeroTotalDeDocentes: 60,
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
          },
          {
            nome: "Alagoas",
            id: 2,
          },
          {
            nome: "Amapá",
            id: 3,
          },
          {
            nome: "Amazonas",
            id: 4,
          },
          {
            nome: "Bahia",
            id: 5,
          },
          {
            nome: "Ceará",
            id: 6,
          },
          {
            nome: "Distrito Federal",
            id: 27,
          },
          {
            nome: "Espírito Santo",
            id: 7,
          },
          {
            nome: "Goiás",
            id: 8,
          },
          {
            nome: "Maranhão",
            id: 9,
          },
          {
            nome: "Mato Grosso",
            id: 10,
          },
          {
            nome: "Mato Grosso do Sul",
            id: 11,
          },
          {
            nome: "Minas Gerais",
            id: 12,
          },
          {
            nome: "Pará",
            id: 13,
          },
          {
            nome: "Paraíba",
            id: 14,
          },
          {
            nome: "Paraná",
            id: 15,
          },
          {
            nome: "Pernambuco",
            id: 16,
          },
          {
            nome: "Piauí",
            id: 17,
          },
          {
            nome: "Rio de Janeiro",
            id: 18,
          },
          {
            nome: "Rio Grande do Norte",
            id: 19,
          },
          {
            nome: "Rio Grande do Sul",
            id: 20,
          },
          {
            nome: "Rondônia",
            id: 21,
          },
          {
            nome: "Roraima",
            id: 22,
          },
          {
            nome: "Santa Catarina",
            id: 23,
          },
          {
            nome: "São Paulo",
            id: 24,
          },
          {
            nome: "Sergipe",
            id: 25,
          },
          {
            nome: "Tocantins",
            id: 26,
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
            id: 8,
            descricao: "Educação Infantil",
          },
          {
            id: 1,
            descricao: "Educação Infantil, Ensino Fundamental",
          },
          {
            id: 2,
            descricao:
              "Educação Infantil, Ensino Fundamental, Educação de Jovens Adultos",
          },
          {
            id: 3,
            descricao: "Ensino Fundamental",
          },
          {
            id: 4,
            descricao: "Ensino Fundamental, Educação de Jovens Adultos",
          },
          {
            id: 5,
            descricao: "Ensino Fundamental, Ensino Médio",
          },
          {
            id: 6,
            descricao:
              "Ensino Fundamental, Ensino Médio, Educação de Jovens Adultos",
          },
          {
            id: 12,
            descricao:
              "Ensino Fundamental, Ensino Médio, Educação Profissional",
          },
          {
            id: 7,
            descricao:
              "Ensino Fundamental, Ensino Médio, Educação Profissional, Educação de Jovens Adultos",
          },
          {
            id: 10,
            descricao:
              "Ensino Infantil, Ensino Fundamental, Ensino Médio, Educação de Jovens Adultos",
          },
          {
            id: 11,
            descricao:
              "Ensino Infantil, Ensino Fundamental, Ensino Médio, Educação de Jovens Adultos, Educação Profissional",
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
  )
);

export default server;
