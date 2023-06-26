import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import DragDrop from "../components/Upload/DragDrop";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

test("Lista de escolas é exibida corretamente", async () => {
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const inserirInformacoes = screen.getByText("Inserindo informações");
  fireEvent.click(inserirInformacoes);
  const nome = screen.getByLabelText("Nome da Escola");
  fireEvent.change(nome, { target: { value: "Escola A" } });
  const ufSelect = screen.getByLabelText("UF");
  fireEvent.mouseDown(ufSelect);
  await waitFor(() =>
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
  );
  const ufSelectValue = screen.getByText("Acre");
  fireEvent.click(ufSelectValue);

  const codigo = screen.getByLabelText("Codigo da Escola");
  fireEvent.change(codigo, { target: { value: "123" } });

  const rede = screen.getByLabelText("Rede");
  fireEvent.mouseDown(rede);
  const redeMunicipal = screen.getByText("Municipal");
  fireEvent.click(redeMunicipal);

  const cep = screen.getByLabelText("CEP");
  fireEvent.change(cep, { target: { value: "12345" } });
  const telefone = screen.getByLabelText("Telefone");
  fireEvent.change(telefone, { target: { value: "123" } });

  const etapas = screen.getByLabelText("Etapas de Ensino");
  fireEvent.mouseDown(etapas);
  await waitFor(() =>
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
  );
  const etapasSelecionada = screen.getByText("Educação Infantil");
  fireEvent.click(etapasSelecionada);

  const porte = screen.getByLabelText("Porte");
  fireEvent.mouseDown(porte);
  const porteSelecionado = screen.getByText(
    "Até 50 matrículas de escolarização"
  );
  fireEvent.click(porteSelecionado);

  const endereco = screen.getByLabelText("Endereço");
  fireEvent.change(endereco, { target: { value: "Rua Lebron JAMES" } });

  const municipio = screen.getByLabelText("Município");
  fireEvent.mouseDown(municipio);
  await waitFor(() =>
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
  );
  const municipioValue = screen.getByText("Acrelândia");
  fireEvent.click(municipioValue);

  const local = screen.getByLabelText("Localização");
  fireEvent.mouseDown(local);
  const localSelecionado = screen.getByText("Rural");
  fireEvent.click(localSelecionado);

  const latitude = screen.getByLabelText("Latitude");
  fireEvent.change(latitude, { target: { value: "123" } });

  const longitude = screen.getByLabelText("Longitude");
  fireEvent.change(longitude, { target: { value: "123" } });

  const numeroAlunos = screen.getByLabelText("Número Total de Alunos");
  fireEvent.change(numeroAlunos, { target: { value: "123" } });

  const numeroDocentes = screen.getByLabelText("Número Total de Docentes");
  fireEvent.change(numeroDocentes, { target: { value: "123" } });

  const cadastrar = screen.getByText("Cadastrar");
  fireEvent.click(cadastrar);
});

test("Lista de escolas é exibida corretamente", async () => {
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const inserirInformacoes = screen.getByText("Inserindo informações");
  fireEvent.click(inserirInformacoes);
  const voltar = screen.getByText("Voltar");
  fireEvent.click(voltar);
});

test("Lista de escolas redireciona pra listagem", async () => {
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const inserirInformacoes = screen.getByTestId("redirecionar");
  fireEvent.click(inserirInformacoes);
});

test("Cadastro CSV", async () => {
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const arquivo = screen.getByText("Utilizando Arquivo CSV");
  fireEvent.click(arquivo);

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("não foram cadastradas pois já existem no sistema.");

  const concluir = screen.getByText("Concluir");
  fireEvent.click(concluir);
});

test("Cadastro CSV erro", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.com/api/escolas/cadastrarEscolaPlanilha",
      (req, res, ctx) => {
        return res(ctx.status(406));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const arquivo = screen.getByText("Utilizando Arquivo CSV");
  fireEvent.click(arquivo);

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);
  await screen.findByText("Erro na inserção das escolas!");

  const concluir = screen.getByText("Concluir");
  fireEvent.click(concluir);
});

test("Cadastro CSV vazio", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.com/api/escolas/cadastrarEscolaPlanilha",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const arquivo = screen.getByText("Utilizando Arquivo CSV");
  fireEvent.click(arquivo);

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);
  await screen.findByText("Inserção de arquivos concluída com sucesso");

  const concluir = screen.getByText("Concluir");
  fireEvent.click(concluir);
});

test("Cadastro sem enviar CSV", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.com/api/escolas/cadastrarEscolaPlanilha",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarEscola"]}>
      <App />
    </MemoryRouter>
  );
  const arquivo = screen.getByText("Utilizando Arquivo CSV");
  fireEvent.click(arquivo);

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Nenhum arquivo carregado.");

  const cancelar = screen.getByText("Cancelar");
  fireEvent.click(cancelar);
});

test("Sem o provider", async () => {
  expect(() =>
    render(
      <DragDrop
        onClickAceito={() => {}}
        onClickBack={() => {}}
        onClickError={() => {}}
        onClickErroJaCadastrada={() => {}}
      />
    )
  ).toThrow(
    new Error(
      "useEscolasCadastradas must be used within a EscolasCadastradasProvider"
    )
  );
});
