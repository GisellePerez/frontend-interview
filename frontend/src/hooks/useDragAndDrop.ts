import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TRASH_ZONE_ID } from "../constants/constants";
import { TodoData, TodoListData } from "../types/todos";

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

      queryClient.setQueryData(["todoList", listId], {
        ...todoListData,
        todoItems: newOrder,
      });

      const movedItem = todoListData.todoItems[oldIndex];

      if (logReorderAction) {
        logReorderAction(movedItem);
      }
    }

    setActiveItem(null);
  };

  return { activeItem, setActiveItem, handleDragStart, handleDragEnd };
};
