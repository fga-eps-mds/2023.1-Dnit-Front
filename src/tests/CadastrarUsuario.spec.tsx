/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import { sendCadastroUsuarioDnit } from "../service/usuarioApi";
import server from "./mock/servicosAPI";
import { ExcessoesApi } from "../service/excessoes";
import { notification } from "antd";
import axios, { AxiosError } from "axios";

jest.mock("../service/usuarioApi", () => ({
  ...jest.requireActual("../service/usuarioApi"),
  sendCadastroUsuarioDnit: jest.fn(),
}));

const mockedUseRegister = sendCadastroUsuarioDnit as jest.Mock;

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

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(
    <MemoryRouter initialEntries={["/cadastro"]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("E-mail Institucional");
  const passwordInput = screen.getByLabelText("Senha");
  const confirmPasswordInput = screen.getByLabelText("Confirmar Senha");
  const nomeInput = screen.getByLabelText("Nome Completo");
  const usuarioDnitRadioButton = screen.getByRole("radio", {
    name: "Usuário DNIT",
  });
  const button = screen.getByText("Cadastrar-se");

  fireEvent.change(emailInput, { target: { value: "example@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "password123" },
  });
  fireEvent.change(nomeInput, { target: { value: "Example" } });
  fireEvent.click(usuarioDnitRadioButton);

  const ufSelect = screen.getByRole("combobox");
  fireEvent.mouseDown(ufSelect);

  await waitFor(() =>
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
  );

  const ufSelectValue = screen.getByText("Acre");
  fireEvent.click(ufSelectValue);

  const options = screen.getByTestId("option-1");
  fireEvent.click(options);

  fireEvent.click(button);
  await waitFor(() => expect(mockedUseRegister).toHaveBeenCalledTimes(1));
});

test("should render error in Register form", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/cadastro"]}>
      <App />
    </MemoryRouter>
  );

  await act(async () => {
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar Senha");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password12" },
    });

    const usuarioDnitRadioButton = screen.getByRole("radio", {
      name: "Empresa Executora",
    });
    fireEvent.click(usuarioDnitRadioButton);
  });
});

test("should render error in the Register form when it exists", async () => {
    const mockedError = new ExcessoesApi('409','Email já cadastrado', {"1":"null"});
    mockedUseRegister.mockImplementation(() => Promise.reject(mockedError))
  
    const screen = render(
      <MemoryRouter initialEntries={["/cadastro"]}>
        <App />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("E-mail Institucional");
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar Senha");
    const nomeInput = screen.getByLabelText("Nome Completo");
    const usuarioDnitRadioButton = screen.getByRole("radio", {
      name: "Usuário DNIT",
    });
    const button = screen.getByText("Cadastrar-se");

    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(nomeInput, { target: { value: "Example" } });
    fireEvent.click(usuarioDnitRadioButton);

    const ufSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(ufSelect);

    await waitFor(() =>
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );

    const ufSelectValue = screen.getByText("Acre");
    fireEvent.click(ufSelectValue);

    const options = screen.getByTestId("option-1");
    fireEvent.click(options);

    fireEvent.click(button);

    await waitFor (() => expect(screen.getByText("Email já cadastrado")).toBeInTheDocument())
});
