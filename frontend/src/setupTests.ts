import "@testing-library/jest-dom";
import { vi } from "vitest";
import { mockTranslations } from "./mocks/mock-translations";

// Mock i18next for tests
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      let translation = mockTranslations[key] || key;

      // Handle pluralization
      if (params && "count" in params) {
        const count = params.count as number;
        if (count !== 1 && mockTranslations[`${key}_other`]) {
          translation = mockTranslations[`${key}_other`];
        }
      }

      // Handle interpolation
      if (params && typeof params === "object") {
        Object.entries(params).forEach(([paramKey, value]) => {
          translation = translation.replace(`{{${paramKey}}}`, String(value));
        });
      }

      return translation;
    },
    i18n: {
      language: "en",
      changeLanguage: vi.fn(),
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));
