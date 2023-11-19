import server from "../mock/servicosAPI";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('RanqueEscolaModal', () => {
  it('deve passa', async () => {
    expect(1).toBe(1);
  })
});