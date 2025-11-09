import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TodoListCard, TodoListButtonProps } from "./todo-list-card";
import { BrowserRouter } from "react-router-dom";

// Wrapper for Router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("TodoListCard", () => {
  const defaultProps: TodoListButtonProps = {
    id: 1,
    name: "My Todo List",
    todoItems: [
      { id: 1, name: "Task 1", description: "", done: false },
      { id: 2, name: "Task 2", description: "", done: true },
    ],
    deleteTodoList: vi.fn(),
  };

  it("renders list name correctly", () => {
    render(<TodoListCard {...defaultProps} />, { wrapper: RouterWrapper });

    const listName = screen.getByTestId("todo-list-name");
    expect(listName).toBeInTheDocument();
    expect(listName).toHaveTextContent("My Todo List");
  });

  it("renders correct list with 2 todo items", () => {
    render(<TodoListCard {...defaultProps} />, { wrapper: RouterWrapper });

    expect(screen.getByTestId("todo-list-item-count")).toHaveTextContent(
      "(2) items",
    );
  });

  it("renders correct list with 1 todo item", () => {
    render(
      <TodoListCard
        {...defaultProps}
        todoItems={defaultProps.todoItems.slice(0, 1)}
      />,
      { wrapper: RouterWrapper },
    );

    expect(screen.getByTestId("todo-list-item-count")).toHaveTextContent(
      "(1) item",
    );
  });

  it("renders 0 items if list has no todoItems", () => {
    render(<TodoListCard {...defaultProps} todoItems={[]} />, {
      wrapper: RouterWrapper,
    });

    expect(screen.getByTestId("todo-list-item-count")).toHaveTextContent(
      "(0) items",
    );
  });

  it("renders view button with correct link", () => {
    render(<TodoListCard {...defaultProps} />, { wrapper: RouterWrapper });

    const viewButton = screen.getByTestId("todo-list-see-more-button");
    expect(viewButton).toBeInTheDocument();

    const link = screen.getByTestId("todo-list-see-more-link");
    expect(link).toHaveAttribute("href", "/todo-list/1");
  });

  it("renders delete button correctly and calls deleteTodoList", async () => {
    const user = userEvent.setup();
    const mockDeleteTodoList = vi.fn();

    render(
      <TodoListCard {...defaultProps} deleteTodoList={mockDeleteTodoList} />,
      { wrapper: RouterWrapper },
    );

    const deleteButton = screen.getByTestId("todo-list-delete-button");
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);
    expect(mockDeleteTodoList).toHaveBeenCalledWith(1);
  });
});
