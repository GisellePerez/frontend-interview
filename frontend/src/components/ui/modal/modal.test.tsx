import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Modal, ModalProps } from "./modal";

describe("Modal", () => {
  const defaultProps: ModalProps = {
    title: "Delete Item",
    message: "Are you sure you want to delete this item?",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders modal title and message correctly", () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByTestId("modal-title")).toBeInTheDocument();
    expect(screen.getByTestId("modal-title")).toHaveTextContent("Delete Item");

    expect(screen.getByTestId("modal-message")).toBeInTheDocument();
    expect(screen.getByTestId("modal-message")).toHaveTextContent(
      "Are you sure you want to delete this item?",
    );
  });

  it("renders custom title and message correctly", () => {
    render(
      <Modal
        {...defaultProps}
        title='Confirm Action'
        message='This action cannot be undone.'
      />,
    );

    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Confirm Action",
    );
    expect(screen.getByTestId("modal-message")).toHaveTextContent(
      "This action cannot be undone.",
    );
  });

  it("renders cancel button correctly and calls onCancel when clicked", async () => {
    const user = userEvent.setup();
    const mockOnCancel = vi.fn();

    render(<Modal {...defaultProps} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByTestId("modal-cancel-button");
    expect(cancelButton).toHaveTextContent("Cancel");
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("renders confirm button correctly and calls onConfirm when clicked", async () => {
    const user = userEvent.setup();
    const mockOnConfirm = vi.fn();

    render(<Modal {...defaultProps} onConfirm={mockOnConfirm} />);

    const deleteButton = screen.getByTestId("modal-confirm-button");
    expect(deleteButton).toHaveTextContent("Confirm");
    await user.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("renders custom text for confirm and cancel buttons correctly", () => {
    render(
      <Modal
        {...defaultProps}
        title='Modal Title'
        message='Modal message'
        cancelButtonText='Custom Cancel'
        confirmButtonText='Custom Confirm'
      />,
    );

    expect(screen.getByTestId("modal-cancel-button")).toHaveTextContent(
      "Custom Cancel",
    );
    expect(screen.getByTestId("modal-confirm-button")).toHaveTextContent(
      "Custom Confirm",
    );
  });

  it("renders both buttons in flex container", () => {
    const { container } = render(<Modal {...defaultProps} />);

    const buttonContainer = container.querySelector(".flex.justify-end");
    expect(buttonContainer).toBeInTheDocument();

    const buttons = buttonContainer?.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });
});
