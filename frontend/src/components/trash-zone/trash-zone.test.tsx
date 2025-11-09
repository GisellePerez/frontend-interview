import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TrashZone } from "./trash-zone";
import * as dndCore from "@dnd-kit/core";

// Mock @dnd-kit/core
vi.mock("@dnd-kit/core", () => ({
  useDroppable: vi.fn(() => ({
    setNodeRef: vi.fn(),
    isOver: false,
  })),
}));

describe("TrashZone", () => {
  it("renders trash zone with correct text", () => {
    render(<TrashZone />);

    const trashZoneText = screen.getByTestId("trash-zone-text");
    expect(trashZoneText).toBeInTheDocument();
    expect(trashZoneText).toHaveTextContent("Drag items here to delete them");
  });

  it("applies default styles when no items are over zone", () => {
    const screen = render(<TrashZone />);
    const div = screen.getByTestId("trash-zone");

    expect(div).toHaveClass("bg-red-100");
    expect(div).not.toHaveClass("bg-red-200");
    expect(div).not.toHaveClass("scale-105");
  });

  it("applies hover styles when item is over zone", () => {
    // Mocking hook to return isOver: true
    vi.mocked(dndCore.useDroppable).mockReturnValue({
      setNodeRef: vi.fn(),
      isOver: true,
      rect: { current: null },
      node: { current: null },
      over: null,
      active: null,
    });

    const screen = render(<TrashZone />);
    const div = screen.getByTestId("trash-zone");

    expect(div).toHaveClass("bg-red-200");
    expect(div).toHaveClass("scale-105");
  });

  it("renders delete icon", () => {
    const screen = render(<TrashZone />);

    const deleteIcon = screen.getByTestId("trash-zone-delete-icon");
    expect(deleteIcon).toBeInTheDocument();
  });
});
