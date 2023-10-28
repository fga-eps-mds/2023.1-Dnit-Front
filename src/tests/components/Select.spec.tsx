/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent } from "@testing-library/react";
import Select from "../../components/Select";
import { useState } from "react";
import React from 'react'


describe("Testes para o componente Select", () => {
  it("Deve renderizar o Select Corretamente", () => {
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

    // const buttom = screen.getByText("Todos");
    // fireEvent.click(buttom);

    expect(screen.getByPlaceholderText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Título do Select")).toBeInTheDocument();
  });

  it("Deve abrir o dropdown do Select com as opções", () => {
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

    const buttom = screen.getByTestId("customSelect");
    fireEvent.click(buttom);

    expect(screen.getByText("test0")).toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();

  });
});