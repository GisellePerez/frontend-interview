import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock translations for tests
const mockTranslations: Record<string, string> = {
  "todoLists.title": "My Todo Lists",
  "todoLists.loading": "Loading...",
  "todoLists.error": "Error loading lists.",
  "todoLists.empty": "No lists to display",
  "todoLists.addPlaceholder": "Add new todo list...",
  "todoLists.deleteModal.title": "Delete this list?",
  "todoLists.deleteModal.message":
    "This action cannot be undone. All tasks inside the list will also be deleted.",
  "todoLists.deleteModal.confirm": "Delete",
  "todoLists.deleteModal.cancel": "Cancel",
  "todoLists.itemCount": "({{count}}) item",
  "todoLists.itemCount_other": "({{count}}) items",
  "todoList.back": "Back",
  "todoList.historyLog": "History log",
  "todoList.loading": "Loading...",
  "todoList.error": "Error loading todo list",
  "todoList.addPlaceholder": "Add todo...",
  "todoList.noTasks": "No tasks have been entered yet",
  "todoList.dragToReorder": "Drag to reorder",
  "todoList.historyTitle": "Action History",
  "trashZone.message": "Drag items here to delete them",
  "historyLog.title": "Action History",
  "historyLog.empty": "No actions recorded yet",
  "historyLog.clearHistory": "Clear history",
  "historyLog.actions.add": "was ADDED",
  "historyLog.actions.update": "was UPDATED",
  "historyLog.actions.delete": "was DELETED",
  "historyLog.actions.reorder": "was REORDERED",
  "form.required": "This field is required",
  "form.minLength": "Must be at least {{min}} characters",
  "common.add": "Add",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.save": "Save",
  "common.close": "Close",
};

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
