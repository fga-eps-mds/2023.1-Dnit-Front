import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Modal de excluir escola exibida corretamente", async () => {
  const response = await fetch("https://api.aprovaunb.com/api/usuario/login", { method: "POST" });
  expect(response.status).toEqual(200);
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
});

test("Modal de excluir escola exibida erro", async () => {
  const response = await fetch("https://api.aprovaunb.com/api/usuario/login", { method: "POST" });
  expect(response.status).toEqual(200);
  server.use(
    rest.delete(
      "https://api.dnit-eps-mds.com/api/escolas/excluir",
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

  const excluirEscola = screen.getByText("Excluir escola");
  fireEvent.click(excluirEscola);

  const excluir = screen.getByText("Excluir");
  fireEvent.click(excluir);

  const voltar = screen.getByText("Voltar");
  fireEvent.click(voltar);
});
