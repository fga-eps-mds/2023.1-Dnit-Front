import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import { autenticar } from "./mock/autenticacao";
import { Permissao } from "../models/auth";
import { DeletarPerfilDialog } from "../components/DeletarPerfilDialog";
import server from "./mock/servicosAPI";
import PerfilDialog from "../components/PerfilDialog";

beforeAll(() => {
  server.listen();
});

describe('DeletarPerfilDialog', () => {
  it('deve renderizar', () => {
    let deletou = null;

    const screen = render(
      <MemoryRouter>
          <DeletarPerfilDialog onClose={() => { }} perfil={{ id: '1', nome: 'perfil', quantidade: 1 }} />
      </MemoryRouter>
    );

    screen.getByText('Tem certeza que deseja excluir esse perfil?');
    screen.getByText('O perfil perfil é usado por 1 usuários.');
    screen.getByText('Cancelar');
    screen.getByText('Confirmar');
  });

  it('deve cancelar', () => {
    autenticar(Permissao.PerfilRemover);
    let deletou = true;

    const screen = render(
      <MemoryRouter>
          <DeletarPerfilDialog onClose={d => deletou = d} perfil={{ id: '1', nome: 'perfil', quantidade: 1 }} />
      </MemoryRouter>
    );

    screen.getByText('Cancelar').click();
    expect(deletou).toBe(false);
  });

  it('deve mostrar carregando', async () => {
    autenticar(Permissao.PerfilRemover);
    const screen = render(
      <MemoryRouter>
          <DeletarPerfilDialog onClose={() => { }} perfil={{ id: '1', nome: 'perfil', quantidade: 1 }} />
      </MemoryRouter>
    );

    screen.getByText('Confirmar').click();
    await waitFor(() => expect(screen.getByText('Deletando perfil perfil...')).toBeInTheDocument());
  });

  it('deve excluir', async () => {
    let deletou = false;
    const screen = render(
      <MemoryRouter>
          <DeletarPerfilDialog onClose={(d) => deletou = d} perfil={{ id: '1', nome: 'perfil', quantidade: 1 }} />
      </MemoryRouter>
    );

    screen.getByText('Confirmar').click();
    await waitFor(() => expect(screen.getByText('Deletando perfil perfil...')).toBeInTheDocument());
    await waitFor(() => expect(screen.queryAllByText('Perfil deletado com sucesso').length).toBeGreaterThan(0));
    expect(deletou).toBeTruthy();
  });

  it('deve mostrar notificacão de erro', async () => {
    let deletou = false;
    const screen = render(
      <MemoryRouter>
          <DeletarPerfilDialog onClose={(d) => deletou = d} perfil={{ id: 'erro', nome: 'perfil', quantidade: 1 }} />
      </MemoryRouter>
    );

    screen.getByText('Confirmar').click();
    await waitFor(() => expect(screen.getByText('Falha na exclusão do perfil.')).toBeInTheDocument());
    expect(deletou).not.toBeTruthy();
  });
});

describe('PerfilDialog Criação', () => {
  it('deve renderizar em modo criação', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={null} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
  });

  it('deve preencher o nome', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={null} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Nome:')).toBeInTheDocument());
    
    fireEvent.change(screen.getByTestId('perfil-nome'), {target: {value: 'perfil-nome-texto'}})

    expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-nome-texto');
  });

  it('deve cancelar', async () => {
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

  it('deve mostrar carregamento', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={null} readOnly={false} />
      </MemoryRouter>
    );

    
    await waitFor(() => expect(screen.getByText('Salvar')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('perfil-nome'), {target: {value: 'perfil-nome-texto'}})

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.getByTestId('loading')).toBeInTheDocument());
  });

  it('deve cadastrar', async () => {
    let cadastrou = false

    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={(c) => cadastrou = c != null } id={null} readOnly={false} />
      </MemoryRouter>
    );

    
    await waitFor(() => expect(screen.getByText('Salvar')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('perfil-nome'), {target: {value: 'perfil-nome-texto'}})

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.getByText('O perfil foi cadastrado com sucesso!')).toBeInTheDocument());
  });
});

describe('PerfilDialog Edição', () => {
  it('deve carregar o perfil', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
  });

  it('deve carregar o perifl erro', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={'erro'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Falha na busca pelo perfil.')).toBeInTheDocument());
  });

  it('deve atualizar o perifl', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));

    screen.getByText('Salvar').click();

    await waitFor(() => expect(screen.getByText('O perfil foi alterado com sucesso!')).toBeInTheDocument());
  });

  it('deve selecionar a categoria', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={'1'} readOnly={false} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
    await waitFor(() => expect(screen.getByTestId('collapse-Escola-true')).toBeInTheDocument());
    screen.getByTestId('collapse-Escola-true').getElementsByClassName('app-collapse-checkbox')[0].click();
    await waitFor(() => expect(screen.getByTestId('collapse-Escola-false')).toBeInTheDocument());
  });
});

describe('PerfilDialog Detalhes', () => {
  it('deve carregar o perfil', async () => {
    const screen = render(
      <MemoryRouter>
          <PerfilDialog closeDialog={() => {}} id={'1'} readOnly={true} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Escola')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Ups')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('perfil-nome')).toHaveAttribute('value', 'perfil-teste'));
  });
});
