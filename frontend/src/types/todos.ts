export interface UpdateTodoData {
  name: string;
  description: string;
  done: boolean;
}

export interface TodoData {
  id: number;
  name: string;
  description: string;
  done: boolean;
}

export interface TodoListData {
  id: number;
  name: string;
  todoItems: TodoData[];
}
