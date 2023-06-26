import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
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
