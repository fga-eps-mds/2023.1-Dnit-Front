/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import server from "./mock/servicosAPI";

beforeAll(() => server.listen());
beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
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

describe("UPSForm", () => {
  test("Mostra mensagem de campos inválidos ao inserir valores inválidos", async () => {
    localStorage.setItem("login", "authenticated");

    const screen = render(
      <MemoryRouter initialEntries={["/telaUPS"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const latitudeInput = screen.getByLabelText("Latitude");
      const longitudeInput = screen.getByLabelText("Longitude");
  
      fireEvent.change(latitudeInput, { target: { value: "120,456" } });
      fireEvent.change(longitudeInput, { target: { value: "890,012" } });
    });


    await waitFor(() => {
      expect(
        screen.getByText(
          "Valores entre -90 e +90, até 15 decimais, utilizando ponto!"
        )
      ).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(
        screen.getByText(
          "Valores entre -180 e +180, até 15 decimais, utilizando ponto!"
        )
      ).toBeInTheDocument();
    });
  });

  test("Exibe valores de UPS quando a resposta do calcularUps é recebida", async () => {
    localStorage.setItem("login", "authenticated");

    const screen = render(
      <MemoryRouter initialEntries={["/telaUPS"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const latitudeInput = screen.getByLabelText("Latitude");
      const longitudeInput = screen.getByLabelText("Longitude");
      const submitButton = screen.getByText("Calcular UPS");

      fireEvent.change(latitudeInput, { target: { value: "12.456" } });
      fireEvent.change(longitudeInput, { target: { value: "89.012" } });

      userEvent.click(submitButton);
    });

    expect(await screen.findByTestId("spin")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("UPS Geral: 123")).toBeInTheDocument();
        
      },
      { interval: 1010 }
    );

    expect(screen.getByText("UPS 2018: 456")).toBeInTheDocument();
    expect(screen.getByText("UPS 2019: 789")).toBeInTheDocument();
    expect(screen.getByText("UPS 2020: 1011")).toBeInTheDocument();
    expect(screen.getByText("UPS 2021: 1213")).toBeInTheDocument();
    expect(screen.getByText("UPS 2022: 1415")).toBeInTheDocument();
  });
});
