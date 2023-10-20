import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import server from "./mock/servicosAPI";

beforeAll(() => server.listen());
beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const escolasService = "https://escola.dnit.eps-fga.live/api"

test("Modal de excluir escola exibida corretamente", async () => {
  localStorage.setItem("login", "authenticated");

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

  const excluirEscola = screen.getByText("Excluir escola");
  fireEvent.click(excluirEscola);

  const excluir = screen.getByText("Excluir");
  fireEvent.click(excluir);
});

test("Modal de excluir escola exibida erro", async () => {
  localStorage.setItem("login", "authenticated");

  server.use(
    rest.delete(
      `${escolasService}/escolas/excluir`,
      (req, res, ctx) => {
        return res(ctx.status(403));
      }
    )
  );
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

  const excluirEscola = screen.getByText("Excluir escola");
  fireEvent.click(excluirEscola);

  const excluir = screen.getByText("Excluir");
  fireEvent.click(excluir);

  const voltar = screen.getByText("Voltar");
  fireEvent.click(voltar);
});
