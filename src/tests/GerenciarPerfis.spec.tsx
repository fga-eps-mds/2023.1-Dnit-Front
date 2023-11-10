/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, waitFor } from "@testing-library/react";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import GerenciarPerfis from "../pages/gerencia/GerenciarPerfis";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("GerenciarPerfis", () => {

    it("deve listar perfis", async () => {
        autenticar(Permissao.PerfilVisualizar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Administrador')).toBeInTheDocument);
        await waitFor(() => expect(screen.getByText('Básico')).toBeInTheDocument);
        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);
    });

    it("nao deve mostrar mostrar criação de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Administrador')).toBeInTheDocument);
        expect(screen.queryByText('Criar Perfil')).not.toBeInTheDocument();
    })

    it("deve mostrar modal de edição de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar, Permissao.PerfilEditar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);

        screen.getByTestId("table-row-edit-2").click();

        await waitFor(() => expect(screen.getByText('Edição de Perfil')).toBeInTheDocument());
    });

    it("não deve mostrar modal de edição de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);

        expect(screen.queryByTestId('table-row-edit-2"')).not.toBeInTheDocument();
    });

    it("deve mostrar modal de remoção de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar, Permissao.PerfilRemover);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);

        screen.getByTestId("table-row-delete-2").click();

        await waitFor(() => expect(screen.getByText('Tem certeza que deseja excluir esse perfil?')).toBeInTheDocument());
    });

    it("não deve mostrar modal de remoção de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);

        expect(screen.queryByTestId("table-row-delete-2")).not.toBeInTheDocument();
    });

    it("deve mostrar modal de detalhes de perfil", async () => {
        autenticar(Permissao.PerfilVisualizar);

        const screen = render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarPerfis />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Custom')).toBeInTheDocument);

        screen.getByTestId("table-row-eye-2").click();

        await waitFor(() => expect(screen.getByText('Detalhes do Perfil')).toBeInTheDocument());
    });
});
