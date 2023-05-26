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

test("should render Login", async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  await act(async () => {
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Senha");
    const entrarButton = getByText("Entrar");

    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(entrarButton);
  });
  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith("Received values of form: ", {
      email: "example@example.com",
      password: "password123",
    })
  );

  consoleSpy.mockRestore();
});
