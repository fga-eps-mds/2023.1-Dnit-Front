import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import server from "./mock/service";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Exibir escola selecionada", async () => {
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

  test("Alterar escola selecionada", async () => {
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
  
    const telefone = screen.getByLabelText("Telefone");
    fireEvent.change(telefone, { target: { value: "12309876" } });
  
    const latitude = screen.getByLabelText("Latitude");
    fireEvent.change(latitude, { target: { value: "89" } });
  
    const longitude = screen.getByLabelText("Longitude");
    fireEvent.change(longitude, { target: { value: "120" } });
  
    const alunos = screen.getByLabelText("Número total de alunos");
    fireEvent.change(alunos, { target: { value: "120" } });
  
    const docentes = screen.getByLabelText("Número total de docentes");
    fireEvent.change(docentes, { target: { value: "120" } });
  
    const salvarEscolaSelecionada = screen.getByText("Salvar");
    fireEvent.click(salvarEscolaSelecionada);
  });