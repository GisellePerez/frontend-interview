import { API_BASE_URL, API_URL_SEGMENTS } from "../constants/constants";
import {
  CreateTodoData,
  TodoData,
  TodoListData,
  UpdateTodoData,
} from "../types/todos";

const { TODO_LISTS, TODO_ITEMS } = API_URL_SEGMENTS;

/**
 * Todo Lists
 */
export const fetchAllTodoLists = async (): Promise<TodoListData[]> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todo lists: ${response.status}`);
  }

  return response.json();
};

export const deleteTodoListById = async (todoListId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}/${todoListId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo list: ${response.status}`);
  }
};

export const createTodoList = async (
  payload: CreateTodoData,
): Promise<TodoListData> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo list: ${response.status}`);
  }

  return response.json();
};

export const fetchTodoListById = async (
  todoListId: number,
): Promise<TodoListData> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}/${todoListId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todo list: ${response.status}`);
  }

  return response.json();
};

/**
 * Todo Items
 */
export const addTodoItem = async (
  todoListId: number,
  payload: string,
): Promise<TodoData> => {
  const response = await fetch(
    `${API_BASE_URL}/${TODO_LISTS}/${todoListId}/${TODO_ITEMS}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: payload }),
    },
  );
  return response.json();
};

export const deleteTodoItem = async (
  todoListId: number,
  todoItemId: number,
): Promise<void> => {
  await fetch(
    `${API_BASE_URL}/${TODO_LISTS}/${todoListId}/${TODO_ITEMS}/${todoItemId}`,
    {
      method: "DELETE",
    },
  );
};

export const toggleTodoItemDone = async (
  todoListId: number,
  todoItemId: number,
  payload: UpdateTodoData,
): Promise<TodoData> => {
  const response = await fetch(
    `${API_BASE_URL}/${TODO_LISTS}/${todoListId}/${TODO_ITEMS}/${todoItemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  return response.json();
};

export const reorderTodoItems = async (
  todoListId: number,
  order: { id: number; order: number }[],
): Promise<TodoData[]> => {
  const response = await fetch(
    `${API_BASE_URL}/${TODO_LISTS}/${todoListId}/reorder`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to reorder todo items");
  }

  return response.json();
};
