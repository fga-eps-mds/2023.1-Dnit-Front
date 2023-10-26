/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  Collapse,
  CollapseItem,
  CollapseCheckBox,
} from "../../components/Collapse";

describe("Testes para o Collapse e seus componentes", () => {
  it("Deve renderizar o Collapse corretamente", () => {
    const itens = [false, false, false];
    let todosSelecionados = false;

    const screen = render(
      <Collapse
        titulo="Título do Collapse"
        readOnly={false}
        selected={false}
        onSelect={() => (todosSelecionados = !todosSelecionados)}
      >
        {itens.map((i, index) => (
          <CollapseItem
            readOnly={false}
            selected={i}
            onSelect={() => (itens[index] = !i)}
          >
            Item {index + 1}
          </CollapseItem>
        ))}
      </Collapse>
    );
    const buttom = screen.getByText("Título do Collapse");
    fireEvent.click(buttom);

    expect(screen.getByText("Título do Collapse")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("Teste para CollapseCheckBox", () => {
    const onSelect = jest.fn();
    const screen = render(
      <CollapseCheckBox readOnly={false} selected={true} onSelect={onSelect} />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("checked");

    fireEvent.click(checkbox);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
