import { useState } from "react";
import { TodoAction, TodoData } from "../types/todos";

export const useActionsHistory = () => {
  const [actionHistory, setActionHistory] = useState<TodoAction[]>([]);

  const logAction = (action: TodoAction) => {
    setActionHistory((prev) => [action, ...prev]);
  };

  const logAddAction = (data: TodoData) => {
    logAction({
      id: crypto.randomUUID(),
      type: "add",
      itemId: data.id,
      itemName: data.name,
      timestamp: Date.now(),
    });
  };

  const logDeleteAction = (id: TodoData["id"], name: TodoData["name"]) => {
    logAction({
      id: crypto.randomUUID(),
      type: "delete",
      itemId: id,
      itemName: name || "Deleted item",
      timestamp: Date.now(),
    });
  };

  const logUpdateAction = (item: TodoData) => {
    logAction({
      id: crypto.randomUUID(),
      type: "update",
      itemId: item.id,
      itemName: item.name || "Item",
      payload: item,
      timestamp: Date.now(),
    });
  };

  const logReorderAction = (item: TodoData) => {
    setActionHistory((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "reorder",
        itemId: item.id,
        itemName: item.name,
        timestamp: Date.now(),
      },
    ]);
  };

  return {
    actionHistory,
    logAction,
    logAddAction,
    logDeleteAction,
    logUpdateAction,
    logReorderAction,
  };
};
