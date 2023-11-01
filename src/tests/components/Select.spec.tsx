/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent } from "@testing-library/react";
import Select from "../../components/Select";

describe("Testes para o componente Select", () => {
  it("Deve renderizar o Select Corretamente", () => {
    const estadoInicial = '';
    const itemsTest = [{ id: "0", rotulo: "test0" }, { id: "1", rotulo: "test1" }, { id: "2", rotulo: "test2" }]


    const screen = render(
      <Select 
        items={itemsTest}
        value={estadoInicial}
        label={"Título do Select"}
        definePlaceholder="perfilAtual"
        onChange={() => {}}
      />
    )

    expect(screen.getByPlaceholderText("perfilAtual")).toBeInTheDocument();
    expect(screen.getByText("Título do Select")).toBeInTheDocument();
  });

  it("Deve selecionar opção do dropdown do Select", () => {
    const estadoInicial = '';
    const itemsTest = [{ id: "0", rotulo: "test0" }, { id: "1", rotulo: "test1" }, { id: "2", rotulo: "test2" }]


    const screen = render(
      <Select 
        items={itemsTest}
        value={estadoInicial}
        label={"Título do Select"}
        onChange={() => {}}
      />
    )

    const botao = screen.getByTestId("customSelect");
    fireEvent.click(botao);

    expect(screen.getByText("test0")).toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();

    const opcao = screen.getByText("test0");
    fireEvent.click(opcao);

  });
});