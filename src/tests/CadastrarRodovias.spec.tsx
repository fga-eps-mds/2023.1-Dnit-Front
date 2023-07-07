import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import DragDrop from "../components/Upload/DragDrop";
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
        <MemoryRouter initialEntries={["/cadastrarescola"]}>
          <App />
        </MemoryRouter>
      );

      const arquivo = new File(["file content"], "arquivo.csv", { type: "text/csv"});
      const dragDropContainer = screen.getByTestId("drag-drop-container");
      fireEvent.change(dragDropContainer, { target: {files : [arquivo]}});

      await screen.findByText("arquivo.csv");

      const botaoEnviar = screen.getByText("Enviar arquivo");
      fireEvent.click(botaoEnviar);

      await screen.findByText("Inserção de arquivos concluída com sucesso")

      const botaoConcluir = screen.getByText("Concluir");
      fireEvent.click(botaoConcluir);

})



test("Cadastro CSV erro", async () => {
  server.use(
    rest.post(
      "https://api.dnit-eps-mds.com/api/ups/cadastrarRodoviasPlanilha",
      (req, res, ctx) => {
        return res(ctx.status(406));
      }
    )
  );
  render(
    <MemoryRouter initialEntries={["/cadastrarRodovias"]}>
      <App/>
    </MemoryRouter>
  );

  const arquivo = new File(["file content"], "arquivo.csv", { type: "text/csv"});
  const dragDropContainer = screen.getByTestId("drag-drop-container");
  fireEvent.change(dragDropContainer, { target:{ files: [arquivo]}});

  await screen.findByText("arquivo.csv");

  const botaoEnviar = screen.getByText("Enviar arquivo")
  fireEvent.click(botaoEnviar);
  await screen.findByText("Erro na inserção das rodovias!");

  const concluir = screen.getByText("Concluir");
  fireEvent.click(concluir);
});