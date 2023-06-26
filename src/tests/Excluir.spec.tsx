import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Authentication";
import App from "../App";
import { act } from "react-dom/test-utils";
import server from "./mock/service";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Modal de excluir escola exibida corretamente", async () => {
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

    const excluirEscola = screen.getByText("Excluir escola");
    fireEvent.click(excluirEscola);

    const excluir = screen.getByText("Excluir");
    fireEvent.click(excluir);

    screen.debug(undefined,100000)

  });

  test("Modal de excluir escola exibida erro", async () => {
    server.use(rest.delete("https://localhost:7083/api/escolas/excluir", (req, res, ctx) =>{
    const id = req.url.searchParams.get("id");

    if (id === "104") {
      return res(
        ctx.status(403))}
  }))
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

    const excluirEscola = screen.getByText("Excluir escola");
    fireEvent.click(excluirEscola);

    const excluir = screen.getByText("Excluir");
    fireEvent.click(excluir);

    screen.debug(undefined,100000)

  });
