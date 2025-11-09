import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddForm, AddFormProps } from "./add-todo-form";

interface TestFormData {
  name: string;
}

describe("AddForm", () => {
  const defaultProps: AddFormProps<TestFormData> = {
    onSubmit: vi.fn(),
    nameField: "name",
    placeholder: "Custom Placeholder",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders form correctly with all elements", () => {
      render(<AddForm {...defaultProps} />);

      expect(screen.getByTestId("add-form")).toBeInTheDocument();
      expect(screen.getByTestId("add-form-input")).toBeInTheDocument();
      expect(screen.getByTestId("add-form-submit")).toBeInTheDocument();
      expect(screen.getByTestId("add-form-container")).toBeInTheDocument();
    });

    it("renders input with custom placeholder", () => {
      render(<AddForm {...defaultProps} />);

      const input = screen.getByTestId("add-form-input");
      expect(input).toHaveAttribute("placeholder", "Custom Placeholder");
    });

    it("renders input with default placeholder", () => {
      const props = { ...defaultProps };
      delete props.placeholder;

      render(<AddForm {...props} />);

      const input = screen.getByTestId("add-form-input");
      expect(input).toHaveAttribute("placeholder", "Add...");
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid input", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockResolvedValue(undefined);

      render(<AddForm {...defaultProps} onSubmit={mockSubmit} />);

      const input = screen.getByTestId("add-form-input");
      const submitButton = screen.getByTestId("add-form-submit");

      await user.type(input, "New Todo");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ name: "New Todo" }),
        );
      });
    });

    it("clears input after submit", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockResolvedValue(undefined);

      render(<AddForm {...defaultProps} onSubmit={mockSubmit} />);

      const input = screen.getByTestId("add-form-input") as HTMLInputElement;

      await user.type(input, "New Todo");
      await user.click(screen.getByTestId("add-form-submit"));

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });
  });

  describe("Validation", () => {
    it("shows error message when input is empty", async () => {
      const user = userEvent.setup();

      render(<AddForm {...defaultProps} />);

      const submitButton = screen.getByTestId("add-form-submit");
      await user.click(submitButton);

      await waitFor(() => {
        const error = screen.getByTestId("add-form-error");
        expect(error).toHaveTextContent("This field is required");
      });
    });
  });
});
