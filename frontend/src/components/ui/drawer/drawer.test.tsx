import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Drawer, DrawerProps } from "./drawer";

describe("Drawer", () => {
  const defaultProps: DrawerProps = {
    children: <div>Drawer Content</div>,
    isOpen: false,
    setIsOpen: vi.fn(),
  };

  it("renders children when open", () => {
    render(<Drawer {...defaultProps} isOpen={true} />);

    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("renders title if provided", () => {
    render(<Drawer {...defaultProps} isOpen={true} title='My Drawer' />);

    expect(screen.getByTestId("drawer-title")).toBeInTheDocument();
  });

  it("does not render title if not provided", () => {
    const { container } = render(<Drawer {...defaultProps} isOpen={true} />);

    const header = container.querySelector("[data-testid='drawer-title']");
    expect(header).not.toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    const user = userEvent.setup();
    const mockSetIsOpen = vi.fn();

    render(
      <Drawer {...defaultProps} isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const closeButton = screen.getByTestId("drawer-close-button");
    await user.click(closeButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("closes modal when overlay is clicked", async () => {
    const user = userEvent.setup();
    const mockSetIsOpen = vi.fn();

    const { container } = render(
      <Drawer {...defaultProps} isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const overlay = container.querySelector(
      "[data-testid='drawer-overlay']",
    ) as HTMLElement;
    await user.click(overlay);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("renders close icon", () => {
    const screen = render(<Drawer {...defaultProps} isOpen={true} />);

    const svg = screen.getByTestId("drawer-close-button");
    expect(svg).toBeInTheDocument();
  });
});
