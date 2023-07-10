import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";

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
  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  const escolas = screen.getByText("Visualizar Escolas");
  fireEvent.click(escolas);
});

test("Visualizar Dados UPS", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  const ups = screen.getByText("Visualizar Dados UPS");
  fireEvent.click(ups);
});

test("Cadastrar Escolas", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  const escolas = screen.getByText("Cadastrar Escolas");
  fireEvent.click(escolas);
});

test("Adicionar Sinistros", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  const sinistros = screen.getByText("Adicionar Sinistros");
  fireEvent.click(sinistros);
});

test("Adicionar Rodovias", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  const rodovias = screen.getByText("Adicionar Rodovias");
  fireEvent.click(rodovias);
});
