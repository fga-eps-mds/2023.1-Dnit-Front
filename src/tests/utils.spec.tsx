import {formataCustoLogistico} from "../utils/utils";

describe('formataCustoLogistico', () => {
    it('deve retornar "$" para distâncias menores ou iguais a 250', () => {
        expect(formataCustoLogistico(250)).toBe('$');
    });

    it('deve retornar "$$" para distâncias maiores que 250 e menores ou iguais a 500', () => {
        expect(formataCustoLogistico(300)).toBe('$$');
    });

    it('deve retornar "$$$" para distâncias maiores que 500 e menores ou iguais a 1000', () => {
        expect(formataCustoLogistico(600)).toBe('$$$');
    });

    it('deve retornar "$$$$" para distâncias maiores que 1000', () => {
        expect(formataCustoLogistico(1500)).toBe('$$$$');
    });
});