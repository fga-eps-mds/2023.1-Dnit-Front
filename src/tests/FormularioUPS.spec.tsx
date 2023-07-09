import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UPSForm from '../components/form/UPSForm'
import fetchCalcularUps from '../service/calcularUps';

jest.mock("../service/calcularUps", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockedUseCalcularUps = fetchCalcularUps as jest.Mock;

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

describe('UPSForm', () => {
    test('Calcula UPS quando usuário coloca dados e aperta o botão', async () => {

        const { getByLabelText, getByText } = render(<UPSForm />);

        const latitudeInput = getByLabelText('Latitude');
        const longitudeInput = getByLabelText('Longitude');
        const submitButton = getByText('Calcular UPS');

        fireEvent.change(latitudeInput, { target: { value: '12.456' } });
        fireEvent.change(longitudeInput, { target: { value: '89.012' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedUseCalcularUps).toHaveBeenCalledTimes(1);
        });
    });

    test('Mostra mensagem de campos inválidos ao inserir valores inválidos', async () => {
        const { getByLabelText, getByText } = render(<UPSForm />);

        const latitudeInput = getByLabelText('Latitude');
        const longitudeInput = getByLabelText('Longitude');

        fireEvent.change(latitudeInput, { target: { value: '120,456' } });
        fireEvent.change(longitudeInput, { target: { value: '890,012' } });

        await waitFor(() => {
            expect(screen.getByText('Valores entre -90 e +90, até 7 decimais, utilizando ponto!')).toBeInTheDocument();
            expect(screen.getByText('Valores entre -180 e +180, até 7 decimais, utilizando ponto!')).toBeInTheDocument();
        });
    });
    test('Exibe valores de UPS quando a resposta do calcularUps é recebida', async () => {
        const mockResponse = {
            upsGeral: 123,
            ups2018: 456,
            ups2019: 789,
            ups2020: 1011,
            ups2021: 1213,
            ups2022: 1415,
        };
        mockedUseCalcularUps.mockResolvedValueOnce(mockResponse);

        const { getByLabelText, getByText } = render(<UPSForm />);

        const latitudeInput = getByLabelText('Latitude');
        const longitudeInput = getByLabelText('Longitude');
        const submitButton = getByText('Calcular UPS');

        fireEvent.change(latitudeInput, { target: { value: '12.456' } });
        fireEvent.change(longitudeInput, { target: { value: '89.012' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('UPS Geral: 123')).toBeInTheDocument();
            expect(screen.getByText('UPS 2018: 456')).toBeInTheDocument();
            expect(screen.getByText('UPS 2019: 789')).toBeInTheDocument();
            expect(screen.getByText('UPS 2020: 1011')).toBeInTheDocument();
            expect(screen.getByText('UPS 2021: 1213')).toBeInTheDocument();
            expect(screen.getByText('UPS 2022: 1415')).toBeInTheDocument();
        });
    });
});