/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import { autenticar } from "./mock/autenticacao";
import { Permissao } from "../models/auth";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
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

test("Visualizar Escolas", async () => {
  autenticar(Permissao.EscolaVisualizar);

  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const escolas = screen.getByText("Visualizar Escolas");
  fireEvent.click(escolas);
});

test("Visualizar Dados UPS", async () => {
  autenticar(Permissao.UpsVisualizar);

  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const ups = screen.getByText("Visualizar Dados UPS");
  fireEvent.click(ups);
});

test("Cadastrar Escolas", async () => {
  autenticar(Permissao.EscolaCadastrar);

  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const escolas = screen.getByText("Cadastrar Escolas");
  fireEvent.click(escolas);
});

test("Adicionar Sinistros", async () => {
  autenticar(Permissao.SinistroCadastrar);

  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const sinistros = screen.getByText("Adicionar Sinistros");
  fireEvent.click(sinistros);
});

test("Adicionar Rodovias", async () => {
  autenticar(Permissao.RodoviaCadastrar);

  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const rodovias = screen.getByText("Adicionar Rodovias");
  fireEvent.click(rodovias);
});
