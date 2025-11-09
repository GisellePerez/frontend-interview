import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguageSwitcher } from "./language-switcher";

// Mock the i18n hook
const mockChangeLanguage = vi.fn();
const mockI18n = {
  language: "en",
  changeLanguage: mockChangeLanguage,
};

vi.mock("react-i18next", async () => {
  const actual = await vi.importActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: mockI18n,
    }),
  };
});

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockI18n.language = "en"; // Reset to English before each test
  });

  it("renders language switcher with EN and ES buttons", () => {
    render(<LanguageSwitcher />);

    const enButton = screen.getByTestId("language-en-button");
    const esButton = screen.getByTestId("language-es-button");

    expect(enButton).toBeInTheDocument();
    expect(esButton).toBeInTheDocument();
    expect(enButton).toHaveTextContent("EN");
    expect(esButton).toHaveTextContent("ES");
  });

  it("calls changeLanguage with 'en' when EN button is clicked", async () => {
    const user = userEvent.setup();
    mockI18n.language = "es"; // Start with Spanish
    render(<LanguageSwitcher />);

    const enButton = screen.getByTestId("language-en-button");
    await user.click(enButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it("calls changeLanguage with 'es' when ES button is clicked", async () => {
    const user = userEvent.setup();
    mockI18n.language = "en"; // Start with English
    render(<LanguageSwitcher />);

    const esButton = screen.getByTestId("language-es-button");
    await user.click(esButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith("es");
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });
});
