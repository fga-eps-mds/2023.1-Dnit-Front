import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import fetchRedefinirSenha from "../service/redefinirSenha";

jest.mock("../service/redefinirSenha", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseResetPassword = fetchRedefinirSenha as jest.Mock;

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

describe("", () => {
  it("should render Reset password", async () => {
    mockedUseResetPassword.mockResolvedValueOnce({ success: true });

    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/redefinirSenha?token=aa$$"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = getByLabelText("Nova Senha");
      const passwordConfirmInput = getByLabelText("Confirmar Senha");
      const entrarButton = getByText("Confirmar");

      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(entrarButton);
    });

    await waitFor(() =>
      expect(mockedUseResetPassword).toHaveBeenCalledTimes(1)
    );
  });

  it("should render Reset password", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/redefinirSenha"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = getByLabelText("Nova Senha");
      const passwordConfirmInput = getByLabelText("Confirmar Senha");

      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123" } });
    });
  });
});
