import { fireEvent, render, screen } from "@testing-library/react";
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

test("Cadastro CSV", async () => {
  localStorage.setItem("login", "authenticated");

  server.use(
    rest.post(
      "https://api.aprovaunb.com.br/api/sinistro/cadastrarSinistroPlanilha",
      (req, res, ctx) => {
        return res(ctx.status(200));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarsinistros"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Inserção de arquivos concluída com sucesso");

  const concluirButton = screen.getByText("Concluir");
  fireEvent.click(concluirButton);
});

test("Cadastro CSV erro", async () => {
  localStorage.setItem("login", "authenticated");

  server.use(
    rest.post(
      "https://api.aprovaunb.com.br/api/sinistro/cadastrarSinistroPlanilha",
      (req, res, ctx) => {
        return res(ctx.status(406));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarsinistros"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Erro na inserção dos Acidentes!");

  const concluirButton = screen.getByText("Concluir");
  fireEvent.click(concluirButton);
});

test("Cadastro CSV vazio", async () => {
  localStorage.setItem("login", "authenticated");

  server.use(
    rest.post(
      "https://api.aprovaunb.com.br/api/sinistro/cadastrarSinistroPlanilha",
      (req, res, ctx) => {
        return res(ctx.status(400), ctx.json("Nenhum arquivo enviado."));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarsinistros"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Nenhum arquivo enviado.");
});

test("Cadastro sem enviar CSV", async () => {
  localStorage.setItem("login", "authenticated");

  server.use(
    rest.post(
      "https://api.aprovaunb.com.br/api/sinistro/cadastrarSinistroPlanilha",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarsinistros"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const enviarButton = screen.getByText("Enviar arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Nenhum arquivo carregado.");

  const cancelar = screen.getByText("Cancelar");
  fireEvent.click(cancelar);
});
