/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent, waitFor, cleanup, prettyDOM } from "@testing-library/react";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import GerenciarUsuario from "../pages/GerenciarUsuario";
import { AuthProvider } from "../provider/Autenticacao";
import { autenticar } from "./mock/autenticacao";
import { Permissao } from "../models/auth";

beforeAll(() => server.listen());

describe("Testes para a pagina de Gerenciar Usuarios", () => {
	autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioEditar);

	it("Deve renderizar a pagina de Gerenciar Usuarios", async () => {
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


	it("Deve filtrar por nome", () => {
		autenticar(Permissao.UsuarioVisualizar, Permissao.UsuarioEditar);

		const screen = render(
			<MemoryRouter>
				<AuthProvider>
					<GerenciarUsuario />
				</AuthProvider>
			</MemoryRouter>
		);

		fireEvent.change(screen.getByTestId("filtroNome"), { target: { value: "usuario0" } });
		expect(screen.getByTestId("filtroNome")).toHaveValue("usuario0");
	});
}); 