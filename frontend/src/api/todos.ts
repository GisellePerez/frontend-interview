import {  UpdateTodoData } from "../types/todos";

const API_BASE_URL = 'http://localhost:4000/api';

export const fetchTodoListById = async (todoListId: number) => {
  const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}`);
  return response.json();
}

export const addTodoItem = async (todoListId: number, payload: string) => {
  const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todo-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: payload }),
  });
  return response.json();
}

export const deleteTodoItem = async (todoListId: number, todoItemId: number) => {
  await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todo-items/${todoItemId}`, {
    method: 'DELETE',
  });
}

export const toggleTodoItemDone = async (todoListId: number, todoItemId: number, payload: UpdateTodoData) => {
  const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todo-items/${todoItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}