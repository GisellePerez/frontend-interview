import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n.ts"; // Import i18n configuration
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodoListPage } from "./pages/TodoListPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/todo-list/:id", element: <TodoListPage /> },
  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
);
