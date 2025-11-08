import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TRASH_ZONE_ID } from "../constants/constants";
import { TodoData, TodoListData } from "../types/todos";
import { reorderTodoItems } from "../api/todos";

type UseDragAndDropOptions = {
  logReorderAction?: (item: TodoData) => void;
};

export const useDragAndDrop = (
  listId: number,
  todoListData?: TodoListData,
  options: UseDragAndDropOptions = {},
) => {
  const queryClient = useQueryClient();
  const { logReorderAction } = options;

  const [activeItem, setActiveItem] = useState<TodoData | null>(null);

  const reorderMutation = useMutation<
    TodoData[],
    Error,
    { id: number; order: number }[],
    { previousData?: TodoListData }
  >({
    mutationFn: (order) => reorderTodoItems(listId, order),

    onMutate: async (order) => {
      await queryClient.cancelQueries({ queryKey: ["todoList", listId] });

      const previousData = queryClient.getQueryData<TodoListData>([
        "todoList",
        listId,
      ]);

      if (previousData) {
        const updatedData: TodoListData = {
          ...previousData,
          todoItems: order.map(({ id, order }) => ({
            ...previousData.todoItems.find((i) => i.id === id)!,
            order,
          })),
        };

        queryClient.setQueryData(["todoList", listId], updatedData);
      }

      // Return context for rollback
      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["todoList", listId], context.previousData);
      }
      console.error("Reorder failed:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList", listId] });
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dragged = todoListData?.todoItems.find(
      (item) => item.id === Number(active.id),
    );
    if (dragged) setActiveItem(dragged);
  };

  const handleDragEnd = (
    event: DragEndEvent,
    onDelete: (id: number) => void,
  ) => {
    const { active, over } = event;
    if (!over || !todoListData) return;

    const itemId = Number(active.id);

    if (over.id === TRASH_ZONE_ID && !isNaN(itemId)) {
      queryClient.setQueryData<TodoListData>(["todoList", listId], (old) => {
        if (!old) return old;
        return {
          ...old,
          todoItems: old.todoItems.filter((i) => i.id !== itemId),
        };
      });
      onDelete(itemId);
      setActiveItem(null);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = todoListData.todoItems.findIndex(
        (i) => i.id === Number(active.id),
      );
      const newIndex = todoListData.todoItems.findIndex(
        (i) => i.id === Number(over.id),
      );
      const newOrder = arrayMove(todoListData.todoItems, oldIndex, newIndex);

      // Optimistic UI update
      queryClient.setQueryData(["todoList", listId], {
        ...todoListData,
        todoItems: newOrder,
      });

      // Payload with updated order for backend
      const payload = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      // Send reorder list to backend to update the todos
      reorderMutation.mutate(payload);

      if (logReorderAction) logReorderAction(todoListData.todoItems[oldIndex]);
    }

    setActiveItem(null);
  };

  return {
    activeItem,
    setActiveItem,
    handleDragStart,
    handleDragEnd,
    reorderMutation, // <-- you can expose it if needed
  };
};
