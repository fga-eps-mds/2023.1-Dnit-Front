import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";

beforeAll(() => server.listen());
beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
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
  autenticar(Permissao.EscolaVisualizar);

  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });
});

test("Filtragem de escolas", async () => {
  autenticar(Permissao.EscolaVisualizar);

  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });

  const filtrarNome = screen.getByLabelText("Nome");
  fireEvent.change(filtrarNome, { target: { value: "Escola A" } });
  const buscarNome = screen.getByTestId("buscar-nome");
  fireEvent.click(buscarNome);

  const filtrarUF = screen.getByTestId("buscar-uf");
  fireEvent.click(filtrarUF);
  const buscarUF = screen.getByText("Acre");
  fireEvent.click(buscarUF);
  fireEvent.click(filtrarUF);
  const buscarUFTodas = screen.getAllByText("Todas");
  fireEvent.click(buscarUFTodas[0]);

  const filtrarMunicipio = screen.getByTestId("buscar-municipio");
  fireEvent.click(filtrarMunicipio);
  const buscarMunicipio = await screen.findByText("Acrelândia");
  fireEvent.click(buscarMunicipio);
  fireEvent.click(filtrarMunicipio);
  const buscarMunicipioTodos = screen.getByText("Todos");
  fireEvent.click(buscarMunicipioTodos);

  const filtrarSituacao = screen.getByTestId("buscar-situacao");
  fireEvent.click(filtrarSituacao);
  const buscarSituacao = screen.getByText("Indicação");
  fireEvent.click(buscarSituacao);
  fireEvent.click(filtrarSituacao);
  const buscarSituacaoTodas = screen.getAllByText("Todas");
  fireEvent.click(buscarSituacaoTodas[0]);

  const etapas = screen.getByRole("combobox");
  userEvent.click(etapas);
  await waitFor(() =>
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
  );

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(etapas);
  const etapasSelecionada = screen.getByText("Educação Infantil");
  fireEvent.click(etapasSelecionada);
});

test("Clicar em Cadastrar escola", async () => {
  autenticar(Permissao.EscolaCadastrar, Permissao.EscolaVisualizar);

  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const cadastrar = screen.getByText("Cadastrar escolas");
  fireEvent.click(cadastrar);
});

test("Mudar quantidade de escolas por página", async () => {
  autenticar(Permissao.EscolaVisualizar);

  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });

  const mudarQuantidade = screen.getByTestId("dropdown-exibir");
  fireEvent.click(mudarQuantidade);

  const mudarQuantidadePara2 = screen.getByTestId("options-2");
  fireEvent.click(mudarQuantidadePara2);

  const avancarPagina = screen.getByTestId("avancar-pagina");
  fireEvent.click(avancarPagina);

  const voltarPagina = screen.getByTestId("voltar-pagina");
  fireEvent.click(voltarPagina);
});

test("Exibir escola selecionada", async () => {
  autenticar(Permissao.EscolaVisualizar);

  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });

  const abrirEscolaSelecionada = screen.getByText("Escola A");
  fireEvent.click(abrirEscolaSelecionada);

  const fecharEscolaSelecionada = screen.getByText("Cancelar");
  fireEvent.click(fecharEscolaSelecionada);
});
