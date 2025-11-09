import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoListData, CreateTodoData } from "../types/todos";
import {
  fetchAllTodoLists,
  createTodoList,
  deleteTodoListById,
} from "../api/todos";

export const useTodoLists = () => {
  const queryClient = useQueryClient();

  /** Fetch all todo lists */
  const {
    data: todoLists,
    isLoading,
    isError,
  } = useQuery<TodoListData[]>({
    queryKey: ["todoLists"],
    queryFn: fetchAllTodoLists,
  });

  /** Add a new list */
  const addTodoList = useMutation({
    mutationFn: (payload: CreateTodoData) => createTodoList(payload),
    onSuccess: (newList) => {
      // Optimistically update cache
      queryClient.setQueryData<TodoListData[]>(["todoLists"], (old) =>
        old ? [...old, newList] : [newList],
      );
    },
    onError: (err) => {
      console.error("Failed to create list", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  /** Delete a list */
  const deleteTodoList = useMutation({
    mutationFn: (id: number) => deleteTodoListById(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todoLists"] });

      const previous = queryClient.getQueryData<TodoListData[]>(["todoLists"]);

      if (previous) {
        queryClient.setQueryData<TodoListData[]>(
          ["todoLists"],
          previous.filter((list) => list.id !== id),
        );
      }

      return { previous };
    },
    onError: (_err, _id, context) => {
      // Rollback in case deleting a list fails
      if (context?.previous) {
        queryClient.setQueryData(["todoLists"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  return {
    todoLists,
    isLoading,
    isError,
    addTodoList,
    deleteTodoList,
  };
};
