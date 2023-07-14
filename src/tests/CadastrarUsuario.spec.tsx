import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import fetchUnidadeFederativa from "../service/unidadesFederativas";
import fetchCadastroUsuario from "../service/cadastrarUsuario";
import server from "./mock/servicosAPI";

jest.mock("../service/register", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseRegister = fetchCadastroUsuario as jest.Mock;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

test("should render Register", async () => {
  mockedUseRegister.mockResolvedValueOnce({ success: true });
  
  const { getByLabelText, getByText, getByRole, queryByText, getByTestId } =
    render(
      <MemoryRouter initialEntries={["/cadastro"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

  const emailInput = getByLabelText("E-mail Institucional");
  const passwordInput = getByLabelText("Senha");
  const confirmPasswordInput = getByLabelText("Confirmar Senha");
  const nomeInput = getByLabelText("Nome Completo");
  const usuarioDnitRadioButton = getByRole("radio", { name: "Usuário DNIT" });
  const button = getByText("Cadastrar-se");

  fireEvent.change(emailInput, { target: { value: "example@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "password123" },
  });
  fireEvent.change(nomeInput, { target: { value: "Example" } });
  fireEvent.click(usuarioDnitRadioButton);

  const ufSelect = getByRole("combobox");
  fireEvent.mouseDown(ufSelect);

  await waitFor(() =>
    expect(queryByText("Carregando...")).not.toBeInTheDocument()
  );

  const ufSelectValue = getByText("Acre");
  fireEvent.click(ufSelectValue);

  const options = getByTestId("option-1");
  fireEvent.click(options);

  fireEvent.click(button);
  await waitFor(() => expect(mockedUseRegister).toHaveBeenCalledTimes(1));
});

test("should render error in Register form", async () => {
  const { getByLabelText, getByRole } = render(
    <MemoryRouter initialEntries={["/cadastro"]}>
      <App />
    </MemoryRouter>
  );

  await act(async () => {
    const passwordInput = getByLabelText("Senha");
    const confirmPasswordInput = getByLabelText("Confirmar Senha");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password12" },
    });

    const usuarioDnitRadioButton = getByRole("radio", {
      name: "Empresa Executora",
    });
    fireEvent.click(usuarioDnitRadioButton);
  });
});