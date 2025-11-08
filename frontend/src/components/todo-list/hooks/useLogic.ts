import { useTodoList } from "../../../hooks/useTodoList";
import { CreateTodoData, TodoData } from "../../../types/todos";
import { useActionsHistory } from "../../../hooks/useActionsHistory";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";

export const useLogic = (listId: number) => {
  const {
    todoList: todoListData,
    isLoading,
    isError,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useTodoList(listId);

  /** Actions history */
  const {
    actionHistory,
    logAddAction,
    logDeleteAction,
    logUpdateAction,
    logReorderAction,
  } = useActionsHistory();

  /** Drag & Drop */
  const { activeItem, setActiveItem, handleDragEnd, handleDragStart } =
    useDragAndDrop(listId, todoListData, {
      // Passing the function here because if we call he hook somewhere else we are create a new instance and that overwrites history
      logReorderAction,
    });

  /** CRUD related functions */
  const handleAddTodo = (data: CreateTodoData) =>
    addTodo.mutate(data, {
      onSuccess(data) {
        logAddAction(data);
      },
    });

  const handleUpdateTodo = (item: TodoData) => {
    const { id, name, description, done } = item;
    updateTodo.mutate(
      {
        id: id,
        payload: {
          name: name,
          description: description,
          done: !done,
        },
      },
      {
        onSuccess: () => {
          logUpdateAction(item);
        },
      },
    );
  };

  const handleDeleteTodo = (item: TodoData) => {
    const { id, name } = item;
    deleteTodo.mutate(id, {
      onSuccess: () => {
        logDeleteAction(id, name);
      },
    });
  };

  return {
    todoListData,
    isLoading,
    isError,
    activeItem,
    setActiveItem,
    actionHistory,
    handleDragStart,
    handleDragEnd,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo,
  };
};
