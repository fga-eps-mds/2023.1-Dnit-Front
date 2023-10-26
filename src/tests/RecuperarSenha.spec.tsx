/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import fetchRecuperarSenha from "../service/recuperarSenha";

jest.mock("../service/recuperarSenha", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseRecoverPassword = fetchRecuperarSenha as jest.Mock;

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

describe("Recover Password Tests", () => {
  it("should render Recover password", async () => {
    mockedUseRecoverPassword.mockResolvedValueOnce({ success: true });

    const screen = render(
      <MemoryRouter initialEntries={["/esqueciSenha"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = screen.getByLabelText("Email");
      const sendButton = screen.getByText("Enviar Link de Recuperação");

      fireEvent.change(passwordInput, { target: { value: "teste@gmail.com" } });
      fireEvent.click(sendButton);
    });

    await waitFor(() =>
      expect(mockedUseRecoverPassword).toHaveBeenCalledTimes(1)
    );
  });
});
