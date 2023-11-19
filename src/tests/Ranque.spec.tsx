import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import Modal from "../components/Modal";
import Ranque from "../pages/Ranque";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
  

describe('TabelaRanque', () => {
    it("Deve renderizar a pagina de Tabela Ranque", async () => {
        autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioPerfilEditar)
        render(
          <MemoryRouter>
            <AuthProvider>
              <Ranque />
            </AuthProvider>
          </MemoryRouter>
        );
    
        expect(screen.getByText("Nome:")).toBeInTheDocument();
        expect(screen.getByText("UF:")).toBeInTheDocument();
        expect(screen.getByText("Municípios:")).toBeInTheDocument();
        expect(screen.getByText("Etapas de Ensino:")).toBeInTheDocument();
      });

    test("Deve renderizar o modal", async () => {
        render(
            <Modal className="modal" closeModal={() => {}}>
                <h4 className="text-center mt-2">{""}</h4>
                <div>
                    <p><strong>Posição:</strong> {""}</p>
                    <p><strong>Pontuação Total:</strong> {""}</p>
                    <p><strong>Código:</strong> {""}</p>
                </div>
                <button>
                    Sair
                </button>
            </Modal>
        )
        expect(screen.getByText("Posição:")).toBeInTheDocument;
        expect(screen.getByText("Pontuação Total:")).toBeInTheDocument;
        expect(screen.getByText("Código:")).toBeInTheDocument;
        expect(screen.getByText("Sair")).toBeInTheDocument;
    })

    it("Deve filtrar a escola por nome", async () => {
      autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioEditar);

      render(
        <MemoryRouter>
          <AuthProvider>
            <Ranque />
          </AuthProvider>
        </MemoryRouter>
      );

      fireEvent.change(screen.getByTestId("filtroNome"), { target: { value: "escola 5"}})
      expect(screen.getByTestId("filtroNome")).toHaveValue("escola 5")
      await waitFor(() => expect(screen.getByText('escola 5')).toBeInTheDocument);
    })

})
