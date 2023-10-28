/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { EditarTipoPerfilDialog } from "../components/EditarTipoPerfilDialog";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import { usuarios } from "./stub/usuarioModelos";
import { equal } from "assert";
import GerenciarUsuario from "../pages/GerenciarUsuario";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testes para a pagina de Gerenciar Usuarios", () => {
	it("Deve renderizar a pagina de Gerenciar Usuarios", async () => {

		const screen = render(
			<MemoryRouter>
				<GerenciarUsuario />
			</MemoryRouter>
		);

		expect(screen.getByText("Nome:")).toBeInTheDocument();
		expect(screen.getByText("UF:")).toBeInTheDocument();
		expect(screen.getByText("Perfil:")).toBeInTheDocument();
		expect(screen.getByText("Perfis de usuário cadastrados")).toBeInTheDocument();
	});

	it.skip("Deve Filtrar pelo Nome", async () => {
		const screen = render(
			<MemoryRouter>
				<GerenciarUsuario />
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText("Nome")
		fireEvent.click(input);

    fireEvent.change(input, { target: { value: 'usuario0' }})

		screen.getByTestId("table-row-eye-2").click;
		

	});
}); 