import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const { container } = render(<Container />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
