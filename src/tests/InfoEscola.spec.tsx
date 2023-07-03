import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Exibir escola selecionada", async () => {
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

  const fecharEscolaSelecionada = screen.getByText("Cancelar");
  fireEvent.click(fecharEscolaSelecionada);
});