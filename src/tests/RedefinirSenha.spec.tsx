/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import {fetchRedefineSenha} from "../service/usuarioApi";

jest.mock("../service/usuarioApi", () => ({
  ...jest.requireActual("../service/usuarioApi"),
  fetchRedefineSenha: jest.fn(),
}));

const mockedUseResetPassword = fetchRedefineSenha as jest.Mock;

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

describe("Reset Password Test", () => {
  it("should render Reset password", async () => {
    mockedUseResetPassword.mockResolvedValueOnce({ success: true });

    const screen = render(
      <MemoryRouter initialEntries={["/redefinirSenha?token=aa$$"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = screen.getByLabelText("Nova Senha");
      const passwordConfirmInput = screen.getByLabelText("Confirmar Senha");
      const entrarButton = screen.getByText("Confirmar");

      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(entrarButton);
    });

    await waitFor(() =>
      expect(mockedUseResetPassword).toHaveBeenCalledTimes(1)
    );
  });

  it("should render Reset password 2", async () => {
    const screen = render(
      <MemoryRouter initialEntries={["/redefinirSenha"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = screen.getByLabelText("Nova Senha");
      const passwordConfirmInput = screen.getByLabelText("Confirmar Senha");

      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123" } });
    });
  });
});
