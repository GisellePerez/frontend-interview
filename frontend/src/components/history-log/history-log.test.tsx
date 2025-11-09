import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { HistoryLog, HistoryLogProps } from "./history-log";
import { TodoAction } from "../../types/todos";

describe("HistoryLog", () => {
  const mockActions: TodoAction[] = [
    {
      id: "1",
      type: "add",
      itemId: 1,
      itemName: "Task 1",
      timestamp: Date.now(),
    },
    {
      id: "2",
      type: "update",
      itemId: 2,
      itemName: "Task 2",
      timestamp: Date.now(),
    },
    {
      id: "3",
      type: "delete",
      itemId: 3,
      itemName: "Task 3",
      timestamp: Date.now(),
    },
  ];

  const defaultProps: HistoryLogProps = {
    actionHistory: mockActions,
    clearHistory: vi.fn(),
  };

  it("renders 3 action history items", () => {
    const { container } = render(<HistoryLog {...defaultProps} />);

    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);

    expect(screen.getByText(/"Task 1" was ADDED/)).toBeInTheDocument();
    expect(screen.getByText(/"Task 2" was UPDATED/)).toBeInTheDocument();
    expect(screen.getByText(/"Task 3" was DELETED/)).toBeInTheDocument();
  });

  it("renders clear history button if there are actions", () => {
    render(<HistoryLog {...defaultProps} />);

    const clearButton = screen.getByTestId("history-log-clear-button");
    expect(clearButton).toBeInTheDocument();
  });

  it("calls clearHistory when button is clicked", async () => {
    const user = userEvent.setup();
    const mockClearHistory = vi.fn();

    render(<HistoryLog {...defaultProps} clearHistory={mockClearHistory} />);

    const clearButton = screen.getByTestId("history-log-clear-button");
    await user.click(clearButton);

    expect(mockClearHistory).toHaveBeenCalledTimes(1);
  });

  it("displays 'No actions to show' if there are no history actions", () => {
    render(<HistoryLog actionHistory={[]} />);

    expect(
      screen.getByTestId("history-log-no-actions-text"),
    ).toBeInTheDocument();
  });

  it("does not render clear button if there are no history actions", () => {
    render(<HistoryLog actionHistory={[]} />);

    const clearButton = screen.queryByTestId("history-log-clear-button");
    expect(clearButton).not.toBeInTheDocument();
  });
});
