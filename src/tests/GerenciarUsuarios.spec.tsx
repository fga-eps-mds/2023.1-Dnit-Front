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

    fireEvent.click(buttonNext);

    fireEvent.click(buttonNext);

    const buttonPrevious = screen.getByTestId("volta-pagina");
    fireEvent.click(buttonPrevious);

    fireEvent.click(buttonPrevious);

    fireEvent.click(buttonPrevious);

    const paginaSelectorDropdown = screen.getByTestId('drop-select-page');
    fireEvent.change(paginaSelectorDropdown, { target: { value: '2' } });

    await waitFor(() => expect(screen.getByText("Nome:")).toBeInTheDocument());

  });

  it("Deve fechar o editor de perfil", async () => {
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    await waitFor(() => screen.getByText(`usuario1`));

    const buttonEdit = screen.getByTestId(`table-row-edit-1`)
    fireEvent.click(buttonEdit);

    await waitFor(() => expect(screen.getByText("Tipo Perfil")).toBeInTheDocument());

    // Testar os dois botões que fecham a modal
    const buttom = screen.getByTestId("botaoCancelar");
    fireEvent.click(buttom);

    await waitFor(() => screen.getByText(`usuario1`));
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(screen.getByText("Tipo Perfil")).toBeInTheDocument());

    const buttomX = screen.getByTestId("botaoFechar");
    fireEvent.click(buttomX);


  })

  it("Deve editar um perfil", async () => {
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    await waitFor(() => screen.getByText(`usuario1`));

    const buttonEdit = screen.getByTestId(`table-row-edit-1`)
    fireEvent.click(buttonEdit);

    await waitFor(() => expect(screen.getByText("Tipo Perfil")).toBeInTheDocument());

    const dropdownPerfil = screen.getByTestId("PerfilcustomSelect");
    fireEvent.click(dropdownPerfil);

    const opcaoPerfil = screen.getByText("Básico");
    fireEvent.click(opcaoPerfil);

    const dropdownUF = screen.getByTestId("UFcustomSelect");
    fireEvent.click(dropdownUF);

    const opcaoUF = screen.getByText("AC");
    (fireEvent.click(opcaoUF));

    await waitFor(() => {
      const dropdownMunicipio = screen.getByTestId("MunicipiocustomSelect");
      fireEvent.click(dropdownMunicipio)
    });

    await waitFor(() => {
      const opcaoMunicipio = screen.getByText("Acrelândia");
      fireEvent.click(opcaoMunicipio);
    });

    const buttom = screen.getByTestId("botaoConfirmar");
    fireEvent.click(buttom);
  });

  it("deve não passar de pagina", async () => {
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    await waitFor(() => screen.getByText(`usuario1`));

    const buttonNext = screen.getByTestId("proxima-pagina");
    fireEvent.click(buttonNext);

    const pageRange = screen.getByText("1-3 de 3 itens");
    await waitFor(() => expect(pageRange).toBeInTheDocument());

    const buttonPrevious = screen.getByTestId("volta-pagina");
    fireEvent.click(buttonPrevious);

    await waitFor(() => expect(pageRange).toBeInTheDocument());
  });

  it("Deve clicar no usuario sem municipio", async () => {
    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarUsuario />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Perfis de usuário cadastrados"));

    await waitFor(() => screen.getByText(`usuario3`));

    expect((await screen.findAllByText("undefined")).length).toBe(3);

  });

}); 