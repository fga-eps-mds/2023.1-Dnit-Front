/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ButtonComponent } from "../../components/Button/index";

test("Renders a default button", () => {
  const screen = render(
    <ButtonComponent
      label="Default Button"
      buttonStyle="primary"
      buttonType="default"
      icon="fa-icon"
    />
  );

  const button = screen.getByText("Default Button");

  expect(button).toBeInTheDocument();
});

test("Renders a circular button", () => {
  const screen = render(
    <ButtonComponent
      label="Circular Button"
      buttonStyle="outlined"
      buttonType="circular"
      icon="fa-icon"
    />
  );

  const button = screen.getByLabelText("Ícone ilustrativo");

  expect(button).toBeInTheDocument();
});

test("Renders a block button", () => {
  const screen = render(
    <ButtonComponent
      label="Block Button"
      buttonStyle="primary"
      buttonType="block"
      icon="fa-icon"
    />
  );

  const button = screen.getByText("Block Button");

  expect(button).toBeInTheDocument();
});

test("Calls onClick function when button is clicked", () => {
  const onClick = jest.fn();

  const screen = render(
    <ButtonComponent
      label="Click Me"
      buttonStyle="primary"
      buttonType="default"
      icon="fa-icon"
      onClick={onClick}
    />
  );

  const button = screen.getByText("Click Me");

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
