import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UPSForm from '../components/form/UPSForm'

describe('UPSForm', () => {
    it('Calcula UPS quando usuário coloca dados e aperta o botão', async () => {
        const mockFetchCalcularUps = jest.fn().mockResolvedValueOnce({
            upsGeral: 123,
            ups2018: 456,
            ups2019: 789,
            ups2020: 1011,
            ups2021: 1213,
            ups2022: 1415,
        });

        jest.mock('../service/calcularUps', () => mockFetchCalcularUps({
            __esModule: true,
            default: jest.fn(),
        })
        );

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            }),
        });

        const { getByLabelText, getByText } = render(<UPSForm />);

        const latitudeInput = getByLabelText('Latitude');
        const longitudeInput = getByLabelText('Longitude');
        const submitButton = getByText('Calcular UPS');

        fireEvent.change(latitudeInput, { target: { value: '123.456' } });
        fireEvent.change(longitudeInput, { target: { value: '789.012' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockFetchCalcularUps).toHaveBeenCalledTimes(0);
        });

        await waitFor(() => {
            expect(screen.getByText('UPS Geral: 123')).toBeInTheDocument();
            expect(screen.getByText('UPS 2018: 456')).toBeInTheDocument();
            expect(screen.getByText('UPS 2019: 789')).toBeInTheDocument();
            expect(screen.getByText('UPS 2020: 1011')).toBeInTheDocument();
            expect(screen.getByText('UPS 2021: 1213')).toBeInTheDocument();
            expect(screen.getByText('UPS 2022: 1415')).toBeInTheDocument();
        })
    });
});