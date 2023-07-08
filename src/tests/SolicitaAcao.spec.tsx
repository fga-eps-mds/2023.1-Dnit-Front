import { fireEvent, render, screen, waitFor, act, getAllByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import server from "./mock/service";
import fetchEtapasDeEnsino from "../service/etapasDeEnsino";
import fetchFederativeUnit from "../service/federativeUnit";
import SolicitacaoAcao from "../pages/SolicitacaoAcao";



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


test("Selecionar escola", async () => {


    screen.debug(undefined, 100000)
    act(() => {


        const screen = render(
            <MemoryRouter initialEntries={["/solicitacaoAcao"]}>
                <App />
            </MemoryRouter>
        );
    });


    expect(screen.getByText("Selecione uma UF")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma UF selecionada")).toBeInTheDocument();
    expect(screen.getByText("Nenhum municipio selecionado")).toBeInTheDocument();
    expect(screen.getByText("Selecione os ciclos de ensino da escola")).toBeInTheDocument();

    const ufSelect = screen.getByLabelText("UF");
    fireEvent.mouseDown(ufSelect);
    await waitFor(() =>
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );
    const UFSelecionada = screen.getByText("Acre");
    fireEvent.click(UFSelecionada);

    const municipioSelect = screen.getByLabelText("Municipios");
    fireEvent.mouseDown(municipioSelect);
    await waitFor(() =>
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );
    const municipioSelecionado = screen.getByText("Acrelândia");
    fireEvent.click(municipioSelecionado);

    const escolaioSelect = screen.getByLabelText("Escola");
    fireEvent.mouseDown(escolaioSelect);
    await waitFor(() =>
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );
    const escolaSelecionada = screen.getByText("ESC ALTINA MAGALHAES DA SILVA");
    fireEvent.click(escolaSelecionada);

});

test("Etapas de ensino", async () => {


    screen.debug(undefined, 100000)
    act(() => {


        const screen = render(
            <MemoryRouter initialEntries={["/solicitacaoAcao"]}>
                <App />
            </MemoryRouter>
        );
    });

    const etapaSelect = screen.getByLabelText("Ciclos de Ensino");
    fireEvent.mouseDown(etapaSelect);
    await waitFor(() =>
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );
    var etapaSelecionada = screen.getByText("Educação de Jovens Adultos");
    fireEvent.click(etapaSelecionada);

    const ufSelect = screen.getByLabelText("UF");
    fireEvent.mouseDown(ufSelect);
    await waitFor(() =>
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()
    );
    fireEvent.mouseDown(etapaSelect);
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument()


});