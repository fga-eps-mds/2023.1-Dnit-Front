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

    // Espera pela renderização inicial
    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    // Simula mudança no seletor de tamanho de página
    const tamanhoPaginaSelector = screen.getByTestId('items-per-page');
    fireEvent.change(tamanhoPaginaSelector, { target: { value: '1' } });

    // Espera pela chamada da API após a mudança de tamanho de página
    await waitFor(() => screen.getByText(`usuario0`)); // Verifica se o último usuário da página está renderizado

    // Simula a seleção de uma nova página
    const buttonNext = screen.getByTestId("proxima-pagina");
    fireEvent.click(buttonNext);

    const buttonPrevious = screen.getByTestId("volta-pagina");
    fireEvent.click(buttonPrevious);

    const paginaSelectorDropdown = screen.getByTestId('drop-select-page');
    fireEvent.change(paginaSelectorDropdown, { target: { value: '2' } });

    // Espera pela chamada da API após a mudança de página
    await waitFor(() => expect(screen.getByText("Nome:")).toBeInTheDocument());

  });
}); 