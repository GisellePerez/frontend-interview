import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NotFoundPage } from "./NotFoundPage";
import { BrowserRouter } from "react-router-dom";

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("NotFoundPage", () => {
  it("renders 404 page with all elements", () => {
    render(<NotFoundPage />, { wrapper: RouterWrapper });

    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-title")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-back-button")).toBeInTheDocument();
  });

  it("renders back to home button with correct link", () => {
    render(<NotFoundPage />, { wrapper: RouterWrapper });

    const backButton = screen.getByTestId("not-found-back-button");
    expect(backButton).toHaveTextContent("Back to Home");
    expect(backButton).toHaveAttribute("href", "/");
  });
});
