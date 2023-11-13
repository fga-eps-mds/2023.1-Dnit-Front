/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { MemoryRouter } from "react-router-dom";
import server from "../mock/servicosAPI";
import PerfilDialog from "../../components/PerfilDialog";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
});

describe('PerfilDialog Criação', () => {
  test('deve renderizar em modo criação', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={null} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
  });

  test('deve preencher o nome', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={null} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Perfil:')).toBeInTheDocument());

    fireEvent.change(screen.getByTestId('perfil-nome'), { target: { value: 'perfil-nome-texto' } })

    expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-nome-texto');
  });

  test('deve cancelar', async () => {
    let cancelou = false;

    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={(c) => cancelou = c == null} id={null} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Cancelar')).toBeInTheDocument());

    screen.getByText('Cancelar').click();
    expect(cancelou).toBe(true);
  });

  test('deve mostrar carregamento', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={null} readOnly={false} />
      </MemoryRouter>
    );


    await waitFor(() => expect(screen.getByText('Salvar')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('perfil-nome'), { target: { value: 'perfil-nome-texto' } })

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.getByTestId('loading')).toBeInTheDocument());
  });

  test('deve cadastrar', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={null} readOnly={false} />
      </MemoryRouter>
    );


    await waitFor(() => expect(screen.getByText('Salvar')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('perfil-nome'), { target: { value: 'perfil-nome-texto' } })

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.queryAllByText('O perfil foi cadastrado com sucesso!').length).toBeGreaterThan(0));
  });
});

describe('PerfilDialog Edição', () => {
  afterEach(() => {
    cleanup();
  });

  test('deve carregar o perfil', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
  });

  test('deve carregar o perifl erro', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={'erro'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Falha na busca pelo perfil.')).toBeInTheDocument());
  });

  test('deve atualizar o perifl', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.getByText('O perfil foi alterado com sucesso!')).toBeInTheDocument());
  });

  test('deve selecionar a categoria', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
    await waitFor(() => expect(screen.getByTestId('collapse-Escola-true')).toBeInTheDocument());
    (screen.getByTestId('collapse-Escola-true').getElementsByClassName('app-collapse-checkbox')[0] as HTMLElement).click();
    await waitFor(() => expect(screen.getByTestId('collapse-Escola-false')).toBeInTheDocument());
  });
});

describe('PerfilDialog Detalhes', () => {
  test('deve carregar o perfil', async () => {
    const screen = render(
      <MemoryRouter>
        <PerfilDialog closeDialog={() => { }} id={'1'} readOnly={true} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
  });

  test('Fecha ao clikar no overlay', async () => {
      const screen = render(
        <MemoryRouter>
          <PerfilDialog closeDialog={() => { }} id={'1'} readOnly={true} />
        </MemoryRouter>
      );

      await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
    
      const overlay = screen.getByTestId('overlay');
      fireEvent.click(overlay); 

  });
});
