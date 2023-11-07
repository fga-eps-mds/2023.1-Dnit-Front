/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent, queryByText } from "@testing-library/react";
import Select from "../../components/Select";
import { Dropdown } from "antd";

const estadoInicial = '';
const itemsTest = [{ id: "0", rotulo: "test0" }, { id: "1", rotulo: "test1" }, { id: "2", rotulo: "test2" }];
const onChangeMock = jest.fn();

afterEach(jest.clearAllMocks);

describe("Testes para o componente Select", () => {
  it("Deve renderizar o Select Corretamente", () => {
    

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
    const screen = render(
      <Select 
        items={itemsTest}
        value={estadoInicial}
        label={"Título do Select"}
        onChange={onChangeMock}
      />
    )

    const botao = screen.getByTestId("customSelect");
    fireEvent.click(botao);

    expect(screen.getByText("test0")).toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();

    const opcao = screen.getByText("test1");
    fireEvent.click(opcao);

    expect(onChangeMock).toHaveBeenCalledWith("1");
  });

  it('Deve fechar o dropdown quando um clique ocorre fora do componente', () => {
    const screen = render(
      <div>
        <div data-testid="outside">Área externa</div>
        <Select items={itemsTest}
        value={itemsTest[0].id}
        onChange={onChangeMock} />
      </div>
    );

    const dropDown = screen.getByTestId("customSelect");
    fireEvent.click(dropDown);

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.getByDisplayValue(itemsTest[0].rotulo)).toBeInTheDocument();
  });


});