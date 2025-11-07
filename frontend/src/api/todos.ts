import { API_BASE_URL, API_URL_SEGMENTS } from "../constants/constants";
import {
  CreateTodoData,
  TodoData,
  TodoListData,
  UpdateTodoData,
} from "../types/todos";

const { TODO_LISTS, TODO_ITEMS } = API_URL_SEGMENTS;

export const fetchAllTodoLists = async (): Promise<TodoListData[]> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}`);
  return response.json();
};

export const deleteTodoListById = async (
  todoListId: number,
): Promise<TodoListData[]> => {
  await fetch(`${API_BASE_URL}/todo-lists/${todoListId}`, {
    method: "DELETE",
  });
  return fetchAllTodoLists();
};

export const createTodoList = async (
  payload: CreateTodoData,
): Promise<TodoListData[]> => {
  await fetch(`${API_BASE_URL}/${TODO_LISTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload }),
  });

  return fetchAllTodoLists();
};

export const fetchTodoListById = async (
  todoListId: number,
): Promise<TodoListData> => {
  const response = await fetch(`${API_BASE_URL}/${TODO_LISTS}/${todoListId}`);
  return response.json();
};

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
