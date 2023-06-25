import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Authentication";
import App from "../App";
import { act } from "react-dom/test-utils";
import fetchExcluirEscola from "../service/excluirEscola";
import fetchlistSchools from "../service/listSchools";

jest.mock("../service/excluirEscola", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("../service/listSchools", () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockedExcluirEscola = fetchExcluirEscola as jest.Mock;
const mockedListarEscola = fetchlistSchools as jest.Mock;

describe('Tela de Descrição da Escola', () => {
    it("Botão de excluir escola deve conseguir remover uma escola", async () => {
        mockedListarEscola.mockResolvedValue(
            [
                {
                    idEscola: 1,
                    codigoEscola: 1,
                    nomeEscola: "SIGMA",
                    idRede: 1,
                    descricaoRede: "Asa norte",
                    cep: "1234567",
                    idUf: 1,
                    siglaUf: "string",
                    endereco: "string",
                    idMunicipio: 0,
                    nomeMunicipio: "string",
                    idLocalizacao: 0,
                    descricaoLocalizacao: "string",
                    longitude: "string",
                    latitud: "string",
                    idEtapasDeEnsino: 0,
                    descricaoEtapasDeEnsino: "string",
                    numeroTotalDeAluno: 0,
                    idSituaca: 0,
                    descricaoSituacao: "string",
                    idPorte: 0,
                    descricaoPorte: "string",
                    telefone: "string",
                    numeroTotalDeDocentes: 0
                }
            ]
        )
        mockedExcluirEscola.mockResolvedValueOnce({ success: true });
        const { getByLabelText, getByText, getByTestId } = render(
            <MemoryRouter initialEntries={["/escolas-cadastradas"]}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </MemoryRouter>
        );
        screen.debug(undefined, 100000);
        await act(async () => {
            const butaoLinhaEscola = getByTestId("linha-escola");
            fireEvent.click(butaoLinhaEscola);

        })
        const butaoExcluirEscola = getByText("Excluir escola");
        fireEvent.click(butaoExcluirEscola);

        const butaoConfirmarExclusao = getByText("Excluir");
        fireEvent.click(butaoConfirmarExclusao);

        await waitFor(() => expect(mockedExcluirEscola).toBeCalledTimes(1))
    })
})