import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import ModalExibirInformacoes from "../components/components-escolasCadastradas/ModalExibirInformacoes";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Remover situação escola", async () => {
  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });

  const abrirEscolaSelecionada = screen.getByText("Escola A");
  fireEvent.click(abrirEscolaSelecionada);

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

    const selecionarSituacao = await screen.findByText("Remover Situação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
});

test("Remover situação escola erro", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.com/api/escolas/removerSituacao",
      (req, res, ctx) => {
        return res(ctx.status(403));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });

  const abrirEscolaSelecionada = screen.getByText("Escola A");
  fireEvent.click(abrirEscolaSelecionada);

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

    const selecionarSituacao = await screen.findByText("Remover Situação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
});

test("Erro de Provider de selectedValue", async () => {
  const escola=
    {
      idEscola: 104,
      codigoEscola: 300,
      nomeEscola: "Escola A",
      idRede: 1,
      descricaoRede: "abc",
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
      descricaoEtapasEnsino: "abc",
      numeroTotalDeAlunos: 100,
      idSituacao: 2,
      descricaoSituacao: "Solicitação da escola",
      idPorte: 1,
      telefone: "Telefone A",
      numeroTotalDeDocentes: 50,
      siglaUf: "AC",
      descricaoLocalizacao: "longe", 
      descricaoPorte:"123",
      observacao: "observacao teste",
      etapaEnsino: {},
    }
  expect(() => render(<ModalExibirInformacoes  escola={escola} open={true} close={():void => {}} />)).toThrow(
    new Error("useSelectedValue must be used within a SelectedValueProvider")
  );
});
