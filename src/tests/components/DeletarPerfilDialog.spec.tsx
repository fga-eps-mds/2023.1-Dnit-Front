import { cleanup, render, waitFor } from "@testing-library/react";
import { DeletarPerfilDialog } from "../../components/DeletarPerfilDialog";
import { MemoryRouter } from "react-router-dom";
import { autenticar } from "../mock/autenticacao";
import { Permissao } from "../../models/auth";
import server from "../mock/servicosAPI";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
  cleanup();
});

describe('DeletarPerfilDialog', () => {
    test('deve renderizar', () => {
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
  
    test('deve cancelar', () => {
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
  
    test('deve mostrar carregando', async () => {
      autenticar(Permissao.PerfilRemover);
      const screen = render(
        <MemoryRouter>
            <DeletarPerfilDialog onClose={() => { }} perfil={{ id: '1', nome: 'perfil', quantidade: 1 }} />
        </MemoryRouter>
      );
  
      screen.getByText('Confirmar').click();
      await waitFor(() => expect(screen.getByText('Deletando perfil perfil...')).toBeInTheDocument());
    });
  
    test('deve excluir', async () => {
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
  
    test('deve mostrar notificacão de erro', async () => {
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
  
  