import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoItem, TodoItemProps } from "./todo-item";

// Mock @dnd-kit/sortable
vi.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  }),
}));

// Mock @dnd-kit/utilities
vi.mock("@dnd-kit/utilities", () => ({
  CSS: {
    Transform: {
      toString: () => "",
    },
  },
}));

describe("TodoItem", () => {
  const defaultProps: TodoItemProps = {
    id: 1,
    name: "Test Todo",
    description: "Test Description",
    done: false,
    updateItem: vi.fn(),
    deleteItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders todo item with name", () => {
    render(<TodoItem {...defaultProps} />);

    const itemName = screen.getByTestId("todo-item-name");
    expect(itemName).toBeInTheDocument();
  });

  it("shows unchecked circle icon when not done", () => {
    render(<TodoItem {...defaultProps} />);

    const itemName = screen.getByTestId("todo-item-name");
    expect(itemName).not.toHaveClass("line-through");

    const uncheckedIcon = screen.getByTestId("todo-item-unchecked-icon");
    expect(uncheckedIcon).toBeInTheDocument();

    const checkedIcon = screen.queryByTestId("todo-item-checked-icon");
    expect(checkedIcon).not.toBeInTheDocument();
  });

  it("shows checked circle icon and line-through when done", () => {
    render(<TodoItem {...defaultProps} done={true} />);

    const itemName = screen.getByTestId("todo-item-name");
    expect(itemName).toHaveClass("line-through");

    const uncheckedIcon = screen.queryByTestId("todo-item-unchecked-icon");
    expect(uncheckedIcon).not.toBeInTheDocument();

    const checkedIcon = screen.getByTestId("todo-item-checked-icon");
    expect(checkedIcon).toBeInTheDocument();
  });

  it("calls updateItem with done:true", async () => {
    const user = userEvent.setup();
    const mockUpdateItem = vi.fn();

    render(<TodoItem {...defaultProps} updateItem={mockUpdateItem} />);

    const updateButton = screen.getByTestId("todo-item-update-button");
    await user.click(updateButton);

    expect(mockUpdateItem).toHaveBeenCalledWith(1, {
      name: "Test Todo",
      description: "Test Description",
      done: true,
    });
  });

  it("calls updateItem with done:false", async () => {
    const user = userEvent.setup();
    const mockUpdateItem = vi.fn();

    render(
      <TodoItem {...defaultProps} done={true} updateItem={mockUpdateItem} />,
    );

    const updateButton = screen.getByTestId("todo-item-update-button");
    await user.click(updateButton);

    expect(mockUpdateItem).toHaveBeenCalledWith(1, {
      name: "Test Todo",
      description: "Test Description",
      done: false,
    });
  });

  it("calls deleteItem when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockDeleteItem = vi.fn();

    render(<TodoItem {...defaultProps} deleteItem={mockDeleteItem} />);

    const deleteButton = screen.getByTestId("todo-item-delete-button");
    await user.click(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledWith(1);
  });

  it("renders drag handle", () => {
    render(<TodoItem {...defaultProps} />);

    const dragHandle = screen.getByTestId("todo-item-drag-handle");
    expect(dragHandle).toBeInTheDocument();
  });
});
