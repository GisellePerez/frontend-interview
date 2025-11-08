export interface TodoData {
  id: number;
  name: string;
  description: string;
  done: boolean;
}

export type UpdateTodoData = Omit<TodoData, "id">;

export interface TodoListData {
  id: number;
  name: string;
  todoItems: TodoData[];
}

export type CreateTodoData = Pick<TodoData, "name">;

export type CreateTodoListData = Pick<TodoListData, "name">;

export type TodoAction = {
  id: string;
  type: "add" | "update" | "delete";
  itemId: number;
  itemName: string;
  payload?: Partial<TodoData>;
  timestamp: number;
};
