import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Lista de escolas é exibida corretamente", async () => {
  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    const escolas = screen.getAllByTestId("linha-escola");
    expect(escolas).toHaveLength(3);
  });
});

test("Mudar quantidade de escolas por página", async () => {
  render(
    <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
      <App />
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
