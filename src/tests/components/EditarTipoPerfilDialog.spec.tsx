/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { EditarTipoPerfilDialog } from "../../components/EditarTipoPerfilDialog";
import server from "../mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import { usuarios } from "../stub/usuarioModelos";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());



const itemsPerfisTest = [{ id: "1", rotulo: "perfil1" }, { id: "2", rotulo: "perfil2" }, { id: "3", rotulo: "perfil3" }];
const itemsUfTest = [{ id: "3", rotulo: "uf3" }, { id: "18", rotulo: "RJ" }, { id: "27", rotulo: "DF" },];
const usuarioSelecionado = "1";
const tipoPerfilSelecionado = "perfil1";
const ufSelecionada = "27";
const municipioSelecionado = "5300108";

describe("Testes para o componente EditarTipoPerfilDialog", () => {

  it("Deve renderizar o EditarTipoPerfilDialog Corretamente", () => {
    const screen = render(
      <EditarTipoPerfilDialog
        listaOpcoes={itemsPerfisTest}
        listaOpcoesUfs={itemsUfTest}
        listaUsuarios={usuarios}
        usuarioId={usuarioSelecionado}
        perfilAntesAlteracao={tipoPerfilSelecionado}
        ufAntesAlteracao={ufSelecionada}
        municipioAntesAlteracao={municipioSelecionado}
        closeDialog={() => { }}
        atualizaTabela={() => { }}
      />
    )

    expect(screen.getByText("Tipo Perfil")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Confirmar")).toBeInTheDocument();

  });

  it("Deve cancelar o EditarTipoPerfilDialog Corretamente", () => {
    let deletou = true;

    const screen = render(
      <MemoryRouter>
        <EditarTipoPerfilDialog
          listaOpcoes={itemsPerfisTest}
          listaOpcoesUfs={itemsUfTest}
          listaUsuarios={usuarios}
          usuarioId={usuarioSelecionado}
          perfilAntesAlteracao={tipoPerfilSelecionado}
          ufAntesAlteracao={ufSelecionada}
          municipioAntesAlteracao={municipioSelecionado}
          closeDialog={d => deletou = d}
          atualizaTabela={() => { }}
        />
      </MemoryRouter>
    )

    const buttom = screen.getByTestId("botaoCancelar");
    fireEvent.click(buttom);

    expect(deletou).toBe(false);

  });

  it("Deve alterar o usuario corretamente", async () => {
    const screen = render(
      <MemoryRouter>
        <EditarTipoPerfilDialog
          listaOpcoes={itemsPerfisTest}
          listaOpcoesUfs={itemsUfTest}
          listaUsuarios={usuarios}
          usuarioId={usuarioSelecionado}
          perfilAntesAlteracao={tipoPerfilSelecionado}
          ufAntesAlteracao={ufSelecionada}
          municipioAntesAlteracao={municipioSelecionado}
          closeDialog={() => { }}
          atualizaTabela={() => { }}
        />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText("Tipo Perfil")).toBeInTheDocument());

    const dropdownPerfil = screen.getByTestId("PerfilcustomSelect");
    fireEvent.click(dropdownPerfil);

    const opcaoPerfil = screen.getByText("perfil1");
    fireEvent.click(opcaoPerfil);

    const dropdownUF = screen.getByTestId("UFcustomSelect");
    fireEvent.click(dropdownUF);

    const opcaoUF = screen.getByText("RJ");
    (fireEvent.click(opcaoUF));

    await waitFor(() => {
      const dropdownMunicipio = screen.getByTestId("MunicipiocustomSelect");
      fireEvent.click(dropdownMunicipio)
    });

    await waitFor(() => {
      const opcaoMunicipio = screen.getByText("Araruama");
      fireEvent.click(opcaoMunicipio);
    });

    const buttom = screen.getByTestId("botaoConfirmar");
    fireEvent.click(buttom);

    await waitFor(() => expect(screen.queryAllByText('O perfil foi alterado com sucesso!').length).toBeGreaterThan(0));

  });

  it("Deve tentar alterar perfil sem selecionar opção", async () => {
    const screen = render(
      <MemoryRouter>
        <EditarTipoPerfilDialog
          listaOpcoes={itemsPerfisTest}
          listaOpcoesUfs={itemsUfTest}
          listaUsuarios={usuarios}
          usuarioId={usuarioSelecionado}
          perfilAntesAlteracao={tipoPerfilSelecionado}
          ufAntesAlteracao={ufSelecionada}
          municipioAntesAlteracao={municipioSelecionado}
          closeDialog={() => { }}
          atualizaTabela={() => { }}
        />
      </MemoryRouter>
    )

    const buttom = screen.getByTestId("botaoConfirmar");
    fireEvent.click(buttom);

    await waitFor(() => expect(screen.queryAllByText('Selecione um tipo de perfil').length).toBeGreaterThan(0));

  });

  it("Deve fechar o EditarTipoPerfilDialog Corretamente", () => {
    let deletou = true;

    const screen = render(
      <MemoryRouter>
        <EditarTipoPerfilDialog
          listaOpcoes={itemsPerfisTest}
          listaOpcoesUfs={itemsUfTest}
          listaUsuarios={usuarios}
          usuarioId={usuarioSelecionado}
          perfilAntesAlteracao={tipoPerfilSelecionado}
          ufAntesAlteracao={ufSelecionada}
          municipioAntesAlteracao={municipioSelecionado}
          closeDialog={d => deletou = d}
          atualizaTabela={() => { }}
        />
      </MemoryRouter>
    )

    const buttom = screen.getByTestId("botaoFechar");
    fireEvent.click(buttom);

    expect(deletou).toBe(false);

  });

});