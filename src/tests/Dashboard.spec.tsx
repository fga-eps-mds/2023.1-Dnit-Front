import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";

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
  localStorage.setItem("login", "authenticated");

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
  localStorage.setItem("login", "authenticated");

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
  localStorage.setItem("login", "authenticated");

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
  localStorage.setItem("login", "authenticated");

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
  localStorage.setItem("login", "authenticated");

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
