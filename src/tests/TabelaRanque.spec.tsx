import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import { wait } from "@testing-library/user-event/dist/utils";

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
  

describe('TabelaRanque', () => {
    // test('Listar escolas em ranque', async () => {
    //     render(
    //         <MemoryRouter initialEntries={ ['/rota']} >
    //             <AuthProvider>
    //                 <App />
    //             </AuthProvider>
    //         </MemoryRouter>
    //     );

    //     await waitFor(() => {
    //         // table-row-edit-${id}`
    //         const linhas = screen.getAllByTestId("");
    //         expect(linhas).toHaveLength(4)
    //     })
    // })

    test('Listar escolas em ranque', async () => {
        render(
            <MemoryRouter initialEntries={ ['/rota']} >
                <AuthProvider>
                    <App />
                </AuthProvider>
            </MemoryRouter>
        );

        // click('olhinho')
        
        const tituloModal = screen.getByText('Detalhes da Escola')
        expect(tituloModal).toBeInTheDocument()
    })
})
