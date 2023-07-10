import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import App from "../App";
import server from "./mock/service";

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

describe("UPSForm", () => {
  test("Mostra mensagem de campos inválidos ao inserir valores inválidos", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/telaUPS"]}>
        <App />
      </MemoryRouter>
    );

    const latitudeInput = getByLabelText("Latitude");
    const longitudeInput = getByLabelText("Longitude");

    fireEvent.change(latitudeInput, { target: { value: "120,456" } });
    fireEvent.change(longitudeInput, { target: { value: "890,012" } });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Valores entre -90 e +90, até 7 decimais, utilizando ponto!"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Valores entre -180 e +180, até 7 decimais, utilizando ponto!"
        )
      ).toBeInTheDocument();
    });
  });
  test("Exibe valores de UPS quando a resposta do calcularUps é recebida", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/telaUPS"]}>
        <App />
      </MemoryRouter>
    );

    const latitudeInput = getByLabelText("Latitude");
    const longitudeInput = getByLabelText("Longitude");
    const submitButton = getByText("Calcular UPS");

    fireEvent.change(latitudeInput, { target: { value: "12.456" } });
    fireEvent.change(longitudeInput, { target: { value: "89.012" } });

    userEvent.click(submitButton);
    expect(await screen.findByTestId("spin")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("UPS Geral: 123")).toBeInTheDocument();
        expect(screen.getByText("UPS 2018: 456")).toBeInTheDocument();
        expect(screen.getByText("UPS 2019: 789")).toBeInTheDocument();
        expect(screen.getByText("UPS 2020: 1011")).toBeInTheDocument();
        expect(screen.getByText("UPS 2021: 1213")).toBeInTheDocument();
        expect(screen.getByText("UPS 2022: 1415")).toBeInTheDocument();
      },
      { interval: 1010 }
    );
  });

  test("Erro ", async () => {
    server.use(
      rest.get(
        "https://api.dnit-eps-mds.com.br/api/calcular/ups/escola",
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      )
    );
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/telaUPS"]}>
        <App />
      </MemoryRouter>
    );

    const latitudeInput = getByLabelText("Latitude");
    const longitudeInput = getByLabelText("Longitude");
    const submitButton = getByText("Calcular UPS");

    fireEvent.change(latitudeInput, { target: { value: "12.456" } });
    fireEvent.change(longitudeInput, { target: { value: "89.012" } });

    userEvent.click(submitButton);
  });
});
