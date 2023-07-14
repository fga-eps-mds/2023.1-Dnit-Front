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

describe("", () => {
  it("should render Recover password", async () => {
    mockedUseRecoverPassword.mockResolvedValueOnce({ success: true });

    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/esqueciSenha"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await act(async () => {
      const passwordInput = getByLabelText("Email");
      const sendButton = getByText("Enviar link de recuperação");

      fireEvent.change(passwordInput, { target: { value: "teste@gmail.com" } });
      fireEvent.click(sendButton);
    });

    await waitFor(() =>
      expect(mockedUseRecoverPassword).toHaveBeenCalledTimes(1)
    );
  });
});
