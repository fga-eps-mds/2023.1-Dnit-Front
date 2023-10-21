/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use the actual module for everything except useNavigate
  useNavigate: jest.fn(), // Mock the useNavigate function
}));

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
    const screen = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Footer home={false} />
      </MemoryRouter>
    );
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

  it("should render the component", () => {
    const screen = render(
      <Router>
        <Footer home={false} />
      </Router>
    );
    const footerElement = screen.getByTestId("footer"); // Use a data-testid for the footer element
    expect(footerElement).toBeInTheDocument();
  });

  it('should navigate to the home route when "INÍCIO" is clicked', () => {
    const mockNavigator = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigator); // Set the mock navigate function as the return value of useNavigate

    const screen = render(
      <Router>
        <Footer home={false} />
      </Router>
    );

    fireEvent.click(screen.getByTestId("init-button"));
    expect(mockNavigator).toHaveBeenCalledWith("/");
    fireEvent.click(screen.getByText("Login de Usuário"));
    expect(mockNavigator).toHaveBeenCalledWith("/login");
    fireEvent.click(screen.getByText("Cadastro de Usuário"));
    expect(mockNavigator).toHaveBeenCalledWith("/cadastro");
    fireEvent.click(screen.getByText("Esqueci Minha Senha"));
    expect(mockNavigator).toHaveBeenCalledWith("/esqueciSenha");
    fireEvent.click(screen.getByText("DASHBOARD"));
    expect(mockNavigator).toHaveBeenCalledWith("/dashboard");
    fireEvent.click(screen.getByText("Solicitar Ação"));
    expect(mockNavigator).toHaveBeenCalledWith("/solicitacaoAcao");
    fireEvent.click(screen.getByText("Visualizar UPS"));
    expect(mockNavigator).toHaveBeenCalledWith("/TelaUPS");
    fireEvent.click(screen.getByText("Visualizar Escolas"));
    expect(mockNavigator).toHaveBeenCalledWith("/escolas-cadastradas");
    fireEvent.click(screen.getByText("Cadastro de Escolas"));
    expect(mockNavigator).toHaveBeenCalledWith("/cadastrarescola");
    fireEvent.click(screen.getByText("Inserir Dados de Acidente"));
    expect(mockNavigator).toHaveBeenCalledWith("/cadastrarsinistros");
    fireEvent.click(screen.getByText("Inserir Dados de Rodovias"));
    expect(mockNavigator).toHaveBeenCalledWith("/cadastrarRodovias");
  });
});
