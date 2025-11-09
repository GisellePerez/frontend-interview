/**
 *  Todos types
 **/
export interface TodoData {
  id: number;
  name: string;
  description: string;
  done: boolean;
  order?: number;
}

export type UpdateTodoData = Omit<TodoData, "id">;

export interface TodoListData {
  id: number;
  name: string;
  todoItems: TodoData[];
}

export type CreateTodoData = Pick<TodoData, "name">;

export type CreateTodoListData = Pick<TodoListData, "name">;

/**
 * History actions types
 **/
export type TodoActionType = "add" | "update" | "delete" | "reorder";

export type TodoAction = {
  id: string;
  type: TodoActionType;
  itemId: number;
  itemName: string;
  payload?: Partial<TodoData>;
  timestamp: number;
};
