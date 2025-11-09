import { useState } from "react";
import { useTodoLists } from "../../../hooks/useTodoLists";

export const useLogic = () => {
  const { todoLists, isLoading, isError, addTodoList, deleteTodoList } =
    useTodoLists();

  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const handleConfirmDelete = () => {
    if (selectedListId !== null) {
      deleteTodoList.mutate(selectedListId);
      setSelectedListId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedListId(null);
  };

  return {
    todoLists,
    isLoading,
    isError,
    addTodoList,
    deleteTodoList,
    handleConfirmDelete,
    handleCancelDelete,
    selectedListId,
    setSelectedListId,
  };
};
