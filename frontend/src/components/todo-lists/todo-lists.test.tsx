import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoLists } from "./todo-lists";
import { BrowserRouter } from "react-router-dom";

// Mock the logic hook
const mockUseLogic = vi.fn();
vi.mock("./hooks/usLogic", () => ({
  useLogic: () => mockUseLogic(),
}));

// Wrapper for Router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("TodoLists", () => {
  const mockAddTodoList = {
    mutate: vi.fn(),
  };

  const mockTodoLists = [
    {
      id: 1,
      name: "Shopping List",
      todoItems: [
        { id: 1, name: "Buy milk", description: "", done: false },
        { id: 2, name: "Buy bread", description: "", done: true },
      ],
    },
    {
      id: 2,
      name: "Work Tasks",
      todoItems: [{ id: 3, name: "Review PR", description: "", done: false }],
    },
  ];

  const defaultMockLogic = {
    todoLists: mockTodoLists,
    isLoading: false,
    isError: false,
    addTodoList: mockAddTodoList,
    handleConfirmDelete: vi.fn(),
    handleCancelDelete: vi.fn(),
    selectedListId: null,
    setSelectedListId: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLogic.mockReturnValue(defaultMockLogic);
  });

  describe("Error State", () => {
    it("shows error message when isError is true", () => {
      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        isError: true,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const errorMessage = screen.getByTestId("todo-lists-error");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Error loading lists.");
    });
  });

  describe("Empty State", () => {
    it("shows empty message when there are no todo lists", () => {
      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        todoLists: [],
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const emptyMessage = screen.getByTestId("todo-lists-empty");
      expect(emptyMessage).toBeInTheDocument();
      expect(emptyMessage).toHaveTextContent("No lists to display");
    });

    it("shows empty message when todoLists is null", () => {
      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        todoLists: null,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      expect(screen.getByTestId("todo-lists-empty")).toBeInTheDocument();
    });
  });

  describe("Rendering Lists", () => {
    it("renders title when lists are available", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      const title = screen.getByTestId("todo-lists-title");
      expect(title).toHaveTextContent("My Todo Lists");
    });

    it("renders AddForm component", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      const input = screen.getByTestId("add-form-input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Add new todo list...");
    });

    it("renders all todo lists", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      expect(screen.getByText("Shopping List")).toBeInTheDocument();
      expect(screen.getByText("Work Tasks")).toBeInTheDocument();
    });

    it("renders lists container", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      const container = screen.getByTestId("todo-lists-container");
      expect(container).toBeInTheDocument();

      const listItems = container.querySelectorAll("li");
      expect(listItems).toHaveLength(2);
    });

    it("renders correct item counts for each list", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      expect(screen.getByText("(2) items")).toBeInTheDocument(); // Shopping List
      expect(screen.getByText("(1) item")).toBeInTheDocument(); // Work Tasks
    });
  });

  describe("Adding New List", () => {
    it("calls addTodoList.mutate when form is submitted", async () => {
      const user = userEvent.setup();
      render(<TodoLists />, { wrapper: RouterWrapper });

      const input = screen.getByTestId("add-form-input");
      const submitButton = screen.getByTestId("add-form-submit");

      await user.type(input, "New List");
      await user.click(submitButton);

      expect(mockAddTodoList.mutate).toHaveBeenCalledWith({
        name: "New List",
      });
    });
  });

  describe("Delete Modal", () => {
    it("does not show modal when selectedListId is null", () => {
      render(<TodoLists />, { wrapper: RouterWrapper });

      const modal = screen.queryByTestId("modal-overlay");
      expect(modal).not.toBeInTheDocument();
    });

    it("shows modal when trying to delete a list", () => {
      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        selectedListId: 1,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const modal = screen.queryByTestId("modal-overlay");
      expect(modal).toBeInTheDocument();

      const modalTitle = screen.getByTestId("modal-title");
      expect(modalTitle).toHaveTextContent("Delete this list?");

      const modalMessage = screen.getByTestId("modal-message");
      expect(modalMessage).toHaveTextContent(
        "This action cannot be undone. All tasks inside the list will also be deleted.",
      );
    });

    it("calls setSelectedListId when delete button is clicked", async () => {
      const user = userEvent.setup();
      const mockSetSelectedListId = vi.fn();

      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        setSelectedListId: mockSetSelectedListId,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const deleteButtons = screen.getAllByTestId("todo-list-delete-button");
      await user.click(deleteButtons[0]);

      expect(mockSetSelectedListId).toHaveBeenCalledWith(1);
    });

    it("calls handleConfirmDelete when modal confirm is clicked", async () => {
      const user = userEvent.setup();
      const mockHandleConfirmDelete = vi.fn();

      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        selectedListId: 1,
        handleConfirmDelete: mockHandleConfirmDelete,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const confirmButton = screen.getByTestId("modal-confirm-button");
      await user.click(confirmButton);

      expect(mockHandleConfirmDelete).toHaveBeenCalled();
    });

    it("calls handleCancelDelete when modal cancel is clicked", async () => {
      const user = userEvent.setup();
      const mockHandleCancelDelete = vi.fn();

      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        selectedListId: 1,
        handleCancelDelete: mockHandleCancelDelete,
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      const cancelButton = screen.getByTestId("modal-cancel-button");
      await user.click(cancelButton);

      expect(mockHandleCancelDelete).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles lists with no items", () => {
      mockUseLogic.mockReturnValue({
        ...defaultMockLogic,
        todoLists: [
          {
            id: 1,
            name: "Empty List",
            todoItems: [],
          },
        ],
      });

      render(<TodoLists />, { wrapper: RouterWrapper });

      expect(screen.getByText("Empty List")).toBeInTheDocument();
      expect(screen.getByText("(0) items")).toBeInTheDocument();
    });
  });
});
