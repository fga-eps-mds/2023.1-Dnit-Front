/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ButtonComponent } from "../../components/Button/index";

test("Renders a default button", () => {
  const screen = render(
    <ButtonComponent
      rotulo="Default Button"
      tipo="primary"
      variante="default"
      icone="fa-icon"
    />
  );

  const button = screen.getByText("Default Button");

  expect(button).toBeInTheDocument();
});

test("Renders a circular button", () => {
  const screen = render(
    <ButtonComponent
      rotulo="Circular Button"
      tipo="none"
      variante="circular"
      icone="fa-icon"
    />
  );

  const button = screen.getByLabelText("Ícone ilustrativo");

  expect(button).toBeInTheDocument();
});

test("Renders a block button", () => {
  const screen = render(
    <ButtonComponent
      rotulo="Block Button"
      tipo="primary"
      variante="block"
      icone="fa-icon"
    />
  );

  const button = screen.getByText("Block Button");

  expect(button).toBeInTheDocument();
});

test("Calls onClick function when button is clicked", () => {
  const onClick = jest.fn();

  const screen = render(
    <ButtonComponent
      rotulo="Click Me"
      tipo="primary"
      variante="default"
      icone="fa-icon"
      onClick={onClick}
    />
  );

  const button = screen.getByText("Click Me");

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
