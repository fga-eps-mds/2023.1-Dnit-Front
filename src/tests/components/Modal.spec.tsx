import React from "react";
import { render, screen } from "@testing-library/react";
import Modal from "../../components/Modal/index";

describe("Modal Component", () => {
  test("Renders Modal component with default class and children", () => {
    render(
      <Modal className="modal-container" closeModal={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    // Check if the default class is applied
    const modalOverlay = screen.getByTestId("overlay");
    expect(modalOverlay).toHaveClass("overlay modal-container");

    // Check if the children are rendered
    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  test("Renders Modal component with a custom class", () => {
    render(
      <Modal className="custom" closeModal={() => {}}>
        <div>Custom Modal Content</div>
      </Modal>
    );

    // Check if the custom class is applied
    const modalOverlay = screen.getByTestId("overlay");
    expect(modalOverlay).toHaveClass("overlay custom");
  });
});
