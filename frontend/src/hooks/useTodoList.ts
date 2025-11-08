import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TodoListData,
  TodoData,
  CreateTodoData,
  UpdateTodoData,
} from "../types/todos";
import {
  addTodoItem,
  deleteTodoItem,
  fetchTodoListById,
  toggleTodoItemDone,
} from "../api/todos";

export const useTodoList = (listId: number) => {
  const queryClient = useQueryClient();

  /** Fetch the todo list */
  const {
    data: todoList,
    isLoading,
    isError,
  } = useQuery<TodoListData>({
    queryKey: ["todoList", listId],
    queryFn: () => fetchTodoListById(listId),
  });

  /** Add a new todo item */
  const addTodo = useMutation({
    mutationFn: (payload: CreateTodoData) => addTodoItem(listId, payload.name),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["todoList", listId] });

      const previous = queryClient.getQueryData<TodoListData>([
        "todoList",
        listId,
      ]);
      if (previous) {
        queryClient.setQueryData<TodoListData>(["todoList", listId], {
          ...previous,
          todoItems: [
            ...previous.todoItems,
            {
              id: Date.now(),
              name: newItem.name,
              done: false,
              description: "",
            } as TodoData,
          ],
        });
      }

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["todoList", listId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList", listId] });
    },
  });

  /** Delete a todo item */
  const deleteTodo = useMutation({
    mutationFn: (id: number) => deleteTodoItem(listId, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todoList", listId] });

      const previous = queryClient.getQueryData<TodoListData>([
        "todoList",
        listId,
      ]);
      if (previous) {
        queryClient.setQueryData<TodoListData>(["todoList", listId], {
          ...previous,
          todoItems: previous.todoItems.filter((item) => item.id !== id),
        });
      }

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["todoList", listId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList", listId] });
    },
  });

  /** Toggle or update a todo item */
  const updateTodo = useMutation({
    mutationFn: (variables: { id: number; payload: UpdateTodoData }) =>
      toggleTodoItemDone(listId, variables.id, variables.payload),

    // Optimistic update
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["todoList", listId] });

      const previous = queryClient.getQueryData<TodoListData>([
        "todoList",
        listId,
      ]);

      if (previous) {
        queryClient.setQueryData<TodoListData>(["todoList", listId], {
          ...previous,
          todoItems: previous.todoItems.map((item) =>
            item.id === id ? { ...item, ...payload } : item,
          ),
        });
      }

      return { previous };
    },

    onError: (_err, _variables, context) => {
      // rollback if mutation fails
      if (context?.previous) {
        queryClient.setQueryData(["todoList", listId], context.previous);
      }
    },

    onSettled: () => {
      // refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["todoList", listId] });
    },
  });

  return {
    todoList,
    isLoading,
    isError,
    addTodo,
    deleteTodo,
    updateTodo,
  };
};
