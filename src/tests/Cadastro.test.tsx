import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const consoleSpy = jest.spyOn(console, "log");

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

test("should render Login text", async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter initialEntries={["/cadastro"]}>
      <App />
    </MemoryRouter>
  );

  await act(async () => {
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Senha");
    const confirmPasswordInput = getByLabelText("Confirmar Senha");
    const nomeInput = getByLabelText("Nome Completo");
    const ufButton = getByLabelText("UF de lotação");
    const button = getByText("Cadastrar-se");

    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(nomeInput, { target: { value: "Example" } });
    fireEvent.change(ufButton, { target: { value: "df" } });
    fireEvent.click(button);
  });
  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith("Received values of form: ", {
      email: "example@example.com",
      password: "password123",
      confirmPassword: "password123",
      nome: "Example",
      uf: "df",
    })
  );
});
