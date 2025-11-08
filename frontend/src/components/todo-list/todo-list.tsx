import React, { useEffect, useState } from "react";
import {
  CreateTodoData,
  TodoData,
  TodoListData,
  UpdateTodoData,
} from "../../types/todos";
import { Link, useParams } from "react-router-dom";
import {
  addTodoItem,
  deleteTodoItem,
  fetchTodoListById,
  toggleTodoItemDone,
} from "../../api/todos";
import { TodoItem } from "../todo-item/todo-item";
import { AddForm } from "../add-todo-form/add-todo-form";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { TrashZone } from "../trash-zone/trash-zone";
import { TRASH_ZONE_ID } from "../../constants/constants";

const TodoList: React.FC = () => {
  const params = useParams();
  const listIdParam = Number(params.id);

  const [todoListData, setTodoListData] = useState<TodoListData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activId, setActiveId] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<TodoData | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dragged = todoListData?.todoItems.find(
      (item) => item.id === Number(active.id),
    );
    if (dragged) setActiveItem(dragged);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null); // reset after drop
    if (!over || !todoListData) return;

    if (over.id === TRASH_ZONE_ID) {
      const itemId = Number(active.id);
      if (!isNaN(itemId)) handleDeleteItem(itemId);
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
      setTodoListData({ ...todoListData, todoItems: newOrder });
    }
  };

  const handleAddNewTodo = async (data: CreateTodoData) => {
    const addedItem = await addTodoItem(listIdParam, data.name);
    setTodoListData((prev) =>
      prev ? { ...prev, todoItems: [...prev.todoItems, addedItem] } : prev,
    );
  };

  const handleDeleteItem = async (todoItemId: number) => {
    // Optimistically remove item from UI right away
    setTodoListData((prev) =>
      prev
        ? {
            ...prev,
            todoItems: prev.todoItems.filter((item) => item.id !== todoItemId),
          }
        : prev,
    );

    try {
      await deleteTodoItem(listIdParam, todoItemId);
    } catch (error) {
      console.error("Failed to delete item:", error);

      // If deletion fails, re-fetch or restore item
      fetchTodoListById(listIdParam).then(setTodoListData);
    }
  };

  const handleUpdateItem = async (
    todoItemId: number,
    updatedItem: UpdateTodoData,
  ) => {
    await toggleTodoItemDone(listIdParam, todoItemId, updatedItem).then(
      (newItem) => {
        if (todoListData) {
          setTodoListData({
            ...todoListData,
            todoItems: (todoListData?.todoItems || []).map((item) =>
              item.id === todoItemId ? newItem : item,
            ),
          });
        }
      },
    );
  };

  useEffect(() => {
    fetchTodoListById(listIdParam).then((data) => {
      setTodoListData(data);
    });
  }, [listIdParam]);

  if (!todoListData) return <div>No data available</div>;

  return (
    <div className='flex flex-col items-center justify-center gap-5 m-auto w-[90%] max-w-[790px]'>
      <div className='self-start'>
        <Link to='/' className=' text-black underline'>
          <p>&larr; Back to all lists</p>
        </Link>
      </div>

      <div className='w-full  border-2 border-black rounded-xl overflow-hidden'>
        <div className='bg-black py-4 flex justify-center'>
          <h1 className='text-white text-5xl font-bold'>
            {todoListData?.name ?? "To-Do List"}
          </h1>
        </div>

        <div className='py-8 px-9'>
          <AddForm<CreateTodoData>
            onSubmit={handleAddNewTodo}
            nameField='name'
          />

          {todoListData?.todoItems?.length ? (
            <div className='relative mb-5'>
              <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={todoListData.todoItems}>
                  <ul className='mt-5 space-y-2'>
                    {(todoListData?.todoItems || []).map((item) => (
                      <TodoItem
                        key={item.id}
                        {...item}
                        deleteItem={handleDeleteItem}
                        updateItem={handleUpdateItem}
                      />
                    ))}
                  </ul>
                </SortableContext>

                <TrashZone />

                <DragOverlay>
                  {activeItem && (
                    <li className='flex justify-between py-3 bg-white shadow-xl rounded-md opacity-50 scale-105'>
                      <h2 className='text-[24px]'>{activeItem.name}</h2>
                    </li>
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          ) : (
            <div className='flex items-center justify-center h-48'>
              <p>No tasks have been entered yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
