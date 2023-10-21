/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import Footer from "../components/Rodape";

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

describe("Footer Test", () => {
  it("Footer without navigation", async () => {
    const screen = render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    const loginText = screen.queryByText("Login de Usuário");
    const registerText = screen.queryByText("Cadastro de Usuário");
    const action = screen.queryByText("Solicitar Ação");
    const ups = screen.queryByText("Visualizar UPS");
    const school = screen.queryByText("ESCOLAS");
    const seeSchool = screen.queryByText("Visualizar Escolas");
    const dataInsert = screen.queryByText("Inserir Dados de Acidente");

    expect(loginText).toBeNull();
    expect(registerText).toBeNull();
    expect(action).toBeNull();
    expect(ups).toBeNull();
    expect(school).toBeNull();
    expect(seeSchool).toBeNull();
    expect(dataInsert).toBeNull();
  });

  it("Footer with navigation", async () => {
    const screen = render(<Footer home={false} />);
    const loginText = screen.getByText("Login de Usuário");
    const registerText = screen.getByText("Cadastro de Usuário");
    const action = screen.getByText("Solicitar Ação");
    const ups = screen.getByText("Visualizar UPS");
    const school = screen.getByText("ESCOLAS");
    const seeSchool = screen.getByText("Visualizar Escolas");
    const dataInsert = screen.getByText("Inserir Dados de Acidente");

    expect(loginText).toBeInTheDocument();
    expect(registerText).toBeInTheDocument();
    expect(action).toBeInTheDocument();
    expect(ups).toBeInTheDocument();
    expect(school).toBeInTheDocument();
    expect(seeSchool).toBeInTheDocument();
    expect(dataInsert).toBeInTheDocument();
  });
});
