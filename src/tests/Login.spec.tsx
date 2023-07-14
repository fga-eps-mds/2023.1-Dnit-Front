import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import fetchLogin from "../service/login";

jest.mock("../service/login", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseLogin = fetchLogin as jest.Mock;

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
  it("should render Login", async () => {
    mockedUseLogin.mockResolvedValueOnce({ success: true });

    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const emailInput = getByLabelText("E-mail");
      const passwordInput = getByLabelText("Senha");
      const entrarButton = getByText("Entrar");

      fireEvent.change(emailInput, { target: { value: "dora@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(entrarButton);
    });

    await waitFor(() => expect(mockedUseLogin).toHaveBeenCalledTimes(1));
  });
});

test("Home", async () => {
  const screen = render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  const home = screen.getByTestId("redirecionar");
  fireEvent.click(home);
});
