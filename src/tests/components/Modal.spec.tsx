/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../../components/Modal/index";

test("Renders the modal when isOpen is true", () => {
  const screen = render(
    <Modal
      title="Test Modal"
      isOpen={true}
      button1Text="Close"
      button2Text="Confirm"
      confirmAction={() => {}}
      closeModal={() => {}}
    >
      <p>Modal content</p>
    </Modal>
  );

  expect(screen.getByText("Test Modal")).toBeInTheDocument();
  expect(screen.getByText("Modal content")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();
  expect(screen.getByText("Confirm")).toBeInTheDocument();
});

test("Does not render the modal when isOpen is false", () => {
  const screen = render(
    <Modal
      title="Test Modal"
      isOpen={false}
      button1Text="Close"
      button2Text="Confirm"
      confirmAction={() => {}}
      closeModal={() => {}}
    >
      <p>Modal content</p>
    </Modal>
  );

  // Use data-testid attribute to identify the overlay element
  const overlay = screen.queryByTestId("modal-overlay");

  // Ensure that the modal is not in the document when isOpen is false
  expect(overlay).toBeNull();

  // Check that other elements are not present as well
  expect(screen.queryByTestId("modal-title")).toBeNull();
  expect(screen.queryByTestId("modal-content")).toBeNull();
  expect(screen.queryByTestId("modal-confirm-button")).toBeNull();
  expect(screen.queryByTestId("modal-close-button")).toBeNull();
});

test("Calls confirmAction and closeModal when respective buttons are clicked", () => {
  const confirmAction = jest.fn();
  const closeModal = jest.fn();

  const screen = render(
    <Modal
      title="Test Modal"
      isOpen={true}
      button1Text="Close"
      button2Text="Confirm"
      confirmAction={confirmAction}
      closeModal={closeModal}
    >
      <p>Modal content</p>
    </Modal>
  );

  const confirmButton = screen.getByText("Confirm");
  const closeButton = screen.getByText("Close");

  fireEvent.click(confirmButton);
  fireEvent.click(closeButton);

  // Verify that confirmAction and closeModal were called
  expect(confirmAction).toHaveBeenCalledTimes(1);
  expect(closeModal).toHaveBeenCalledTimes(1);
});
