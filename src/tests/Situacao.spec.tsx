import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import ModalExibirInformacoes from "../components/components-escolasCadastradas/ModalExibirInformacoes";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Alterar situação escola", async () => {
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

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

  await act(async () => {
    const selecionarSituacao = screen.getByText("Indicação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
  });
});

test("Alterar situação escola erro", async () => {
  server.use(
    rest.post(
      "https://localhost:7083/api/escolas/adicionarSituacao",
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

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

  await act(async () => {
    const selecionarSituacao = screen.getByText("Indicação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
  });
});

test("Remover situação escola", async () => {
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

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

  await act(async () => {
    const selecionarSituacao = screen.getByText("Remover Situação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
  });
});

test("Remover situação escola erro", async () => {
  server.use(
    rest.post(
      "https://localhost:7083/api/escolas/removerSituacao",
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

  const alterarSituacao = screen.getByTestId("dropdown-situacao");
  fireEvent.click(alterarSituacao);

  await act(async () => {
    const selecionarSituacao = screen.getByText("Remover Situação");
    fireEvent.click(selecionarSituacao);

    const fecharEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(fecharEscolaSelecionada);
  });
});

test("Erro de Provider de selectedValue", async () => {
  expect(() => render(<ModalExibirInformacoes />)).toThrow(
    new Error("useSelectedValue must be used within a SelectedValueProvider")
  );
});
