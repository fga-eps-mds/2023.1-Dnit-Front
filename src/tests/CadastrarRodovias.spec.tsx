import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import DragDrop from "../components/cadastrarRodovias/UploadPlanilha/DragDrop";
import server from "./mock/service";

beforeAll(() => server.listen());
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

test("Cadastro via CSV", async () => {
  render(
    <MemoryRouter initialEntries={["/cadastrarRodovias"]}>
      <App />
    </MemoryRouter>
  );

  const arquivo = new File(["file content"], "arquivo.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [arquivo] } });

  await screen.findByText("arquivo.csv");

  const botaoEnviar = screen.getByText("Enviar Arquivo");
  fireEvent.click(botaoEnviar);

  await screen.findByText("Inserção de arquivos concluída com sucesso")

  const botaoConcluir = screen.getByText("Concluir");
  fireEvent.click(botaoConcluir);

})



test("Cadastro CSV erro", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.br/api",
      (req, res, ctx) => {
        return res(ctx.status(406));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarRodovias"]}>
      <App />
    </MemoryRouter>
  );

  const arquivo = new File(["file content"], "arquivo.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [arquivo] } });

  await screen.findByText("arquivo.csv");

  const botaoEnviar = screen.getByText("Enviar Arquivo")
  fireEvent.click(botaoEnviar);
  await screen.findByText("Erro na inserção das rodovias!");

  const concluir = screen.getByText("Concluir");
  fireEvent.click(concluir);
});

test("Cadastro CSV vazio", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.br/api",
      (req, res, ctx) => {
        return res(ctx.status(400),ctx.json('Nenhum arquivo enviado.'));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarRodovias"]}>
      <App />
    </MemoryRouter>
  );

  const file = new File(["file content"], "file.csv", { type: "text/csv" });
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target: { files: [file] } });

  await screen.findByText("file.csv");

  const enviarButton = screen.getByText("Enviar Arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Nenhum arquivo enviado.");

});

test("Cadastro sem enviar CSV", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.br/api",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarRodovias"]}>
      <App />
    </MemoryRouter>
  );

  const enviarButton = screen.getByText("Enviar Arquivo");
  fireEvent.click(enviarButton);

  await screen.findByText("Nenhum arquivo carregado.");

  const cancelar = screen.getByText("Cancelar");
  fireEvent.click(cancelar);
});


