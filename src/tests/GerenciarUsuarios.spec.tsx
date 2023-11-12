/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent, waitFor, cleanup, prettyDOM } from "@testing-library/react";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import GerenciarUsuario from "../pages/gerencia/GerenciarUsuario";
import { AuthProvider } from "../provider/Autenticacao";
import { autenticar } from "./mock/autenticacao";
import { Permissao } from "../models/auth";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testes para a pagina de Gerenciar Usuarios", () => {
  it("Deve renderizar a pagina de Gerenciar Usuarios", async () => {
    autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioPerfilEditar)
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Nome:")).toBeInTheDocument();
    expect(screen.getByText("UF:")).toBeInTheDocument();
    expect(screen.getByText("Perfil:")).toBeInTheDocument();
    expect(screen.getByText("Perfis de usuário cadastrados")).toBeInTheDocument();
  });

  it("Deve filtrar por nome", async () => {
    autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioPerfilEditar)
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("filtroNome"), { target: { value: "usuario1" } });
    expect(screen.getByTestId("filtroNome")).toHaveValue("usuario1");
		expect((await screen.findAllByText("usuario1")).length).toBe(1);
  });

  it("Deve selecionar uma das paginas", async () => {
    autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioPerfilEditar)
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    const tamanhoPaginaSelector = screen.getByTestId('items-per-page');
    fireEvent.change(tamanhoPaginaSelector, { target: { value: '1' } });

    await waitFor(() => screen.getByText(`usuario1`)); 
    const buttonNext = screen.getByTestId("proxima-pagina");
    fireEvent.click(buttonNext);

    const buttonPrevious = screen.getByTestId("volta-pagina");
    fireEvent.click(buttonPrevious);

    const paginaSelectorDropdown = screen.getByTestId('drop-select-page');
    fireEvent.change(paginaSelectorDropdown, { target: { value: '2' } });

    await waitFor(() => expect(screen.getByText("Nome:")).toBeInTheDocument());

  });
}); 