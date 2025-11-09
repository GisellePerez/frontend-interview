import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HistoryLogItem } from "./history-log-item";
import { TodoAction } from "../../types/todos";

describe("HistoryLogItem", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-08T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders ADD action correctly", () => {
    const action: TodoAction = {
      id: "1",
      type: "add",
      itemId: 1,
      itemName: "New Task",
      timestamp: new Date("2025-11-08T10:30:00").getTime(),
    };

    render(<HistoryLogItem {...action} />);

    const message = screen.getByTestId("history-log-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/"New Task" was ADDED/);

    const timestamp = screen.getByTestId("history-log-timestamp");
    expect(timestamp).toBeInTheDocument();
    expect(timestamp).toHaveTextContent("(10:30:00 AM)");

    const div = screen.getByTestId("history-log-item");
    expect(div).toHaveClass("bg-green-100");
  });

  it("renders UPDATE action correctly", () => {
    const action: TodoAction = {
      id: "2",
      type: "update",
      itemId: 2,
      itemName: "Updated Task",
      timestamp: new Date("2025-11-08T11:15:00").getTime(),
    };

    render(<HistoryLogItem {...action} />);

    const message = screen.getByTestId("history-log-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/"Updated Task" was UPDATED/);

    const timestamp = screen.getByTestId("history-log-timestamp");
    expect(timestamp).toBeInTheDocument();
    expect(timestamp).toHaveTextContent("(11:15:00 AM)");

    const div = screen.getByTestId("history-log-item");
    expect(div).toHaveClass("bg-purple-100");
  });

  it("renders DELETE action correctly", () => {
    const action: TodoAction = {
      id: "3",
      type: "delete",
      itemId: 3,
      itemName: "Deleted Task",
      timestamp: new Date("2025-11-08T09:45:00").getTime(),
    };

    render(<HistoryLogItem {...action} />);

    const message = screen.getByTestId("history-log-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/"Deleted Task" was DELETED/);

    const timestamp = screen.getByTestId("history-log-timestamp");
    expect(timestamp).toBeInTheDocument();
    expect(timestamp).toHaveTextContent("(9:45:00 AM)");

    const div = screen.getByTestId("history-log-item");
    expect(div).toHaveClass("bg-red-100");
  });

  it("renders REORDER action correctly", () => {
    const action: TodoAction = {
      id: "4",
      type: "reorder",
      itemId: 4,
      itemName: "Reordered Task",
      timestamp: new Date("2025-11-08T14:20:00").getTime(),
    };

    render(<HistoryLogItem {...action} />);

    const message = screen.getByTestId("history-log-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/"Reordered Task" was REORDERED/);

    const timestamp = screen.getByTestId("history-log-timestamp");
    expect(timestamp).toBeInTheDocument();
    expect(timestamp).toHaveTextContent("(2:20:00 PM)");

    const div = screen.getByTestId("history-log-item");
    expect(div).toHaveClass("bg-blue-100");
  });

  it("formats timestamp correctly", () => {
    const action: TodoAction = {
      id: "9",
      type: "add",
      itemId: 9,
      itemName: "Task",
      timestamp: new Date("2025-11-08T15:45:30").getTime(),
    };

    render(<HistoryLogItem {...action} />);

    const timestampText = screen.getByText(/\(/); // check it has parentheses
    expect(timestampText).toBeInTheDocument();
  });
});
