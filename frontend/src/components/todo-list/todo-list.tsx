import React from "react";
import { CreateTodoData } from "../../types/todos";
import { Link, useParams } from "react-router-dom";
import { TodoItem } from "../todo-item/todo-item";
import { AddForm } from "../add-todo-form/add-todo-form";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TrashZone } from "../trash-zone/trash-zone";

import { useLogic } from "./hooks/useLogic";

const TodoList: React.FC = () => {
  const params = useParams();
  const listIdParam = Number(params.id);

  const {
    todoListData,
    isLoading,
    isError,
    activeItem,
    actionHistory,
    handleDragStart,
    handleDragEnd,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo,
  } = useLogic(listIdParam);

  if (isLoading) return <p>Loading...</p>;

  if (isError || !todoListData) return <p>Error loading todo list</p>;

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
          <AddForm<CreateTodoData> onSubmit={handleAddTodo} nameField='name' />

          {todoListData?.todoItems?.length ? (
            <div className='relative mb-5'>
              <DndContext
                onDragStart={handleDragStart}
                onDragEnd={(event) =>
                  handleDragEnd(event, (id) => {
                    const item = (todoListData?.todoItems || []).find(
                      (t) => t.id === id,
                    );
                    if (!item) return;
                    handleDeleteTodo(item);
                  })
                }
              >
                <SortableContext items={todoListData.todoItems}>
                  <ul className='mt-5 space-y-2'>
                    {(todoListData?.todoItems || []).map((item) => (
                      <TodoItem
                        key={item.id}
                        {...item}
                        deleteItem={() => handleDeleteTodo(item)}
                        updateItem={() => handleUpdateTodo(item)}
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

        <hr />

        <div className='action-history'>
          <h2>Action History</h2>
          <ul>
            {actionHistory.map((action) => (
              <li key={action.id}>
                {new Date(action.timestamp).toLocaleTimeString()}:
                {action.type === "add" && `Added "${action.itemName}"`}
                {action.type === "update" && `Updated "${action.itemName}"`}
                {action.type === "delete" && `Deleted "${action.itemName}"`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
