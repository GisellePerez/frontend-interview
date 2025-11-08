import React from "react";
import { CreateTodoData } from "../../types/todos";
import { Link, useParams } from "react-router-dom";
import { TodoItem } from "../todo-item/todo-item";
import { AddForm } from "../add-todo-form/add-todo-form";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TrashZone } from "../trash-zone/trash-zone";
import { useLogic } from "./hooks/useLogic";
import { HistoryLog } from "../history-log/history-log";
import { Drawer } from "../drawer/drawer";
import { MdHistory } from "react-icons/md";

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
    isOpenHistoryLog,
    setisOpenHistoryLog,
    clearHistory,
  } = useLogic(listIdParam);

  if (isLoading) return <p>Loading...</p>;

  if (isError || !todoListData) return <p>Error loading todo list</p>;

  return (
    <div className='flex flex-col items-center justify-center gap-5 m-auto w-[90%] max-w-[790px]'>
      <div className='flex items-center justify-between gap-4 w-full'>
        {/* Back link */}
        <div>
          <Link to='/' className='text-black underline'>
            <p>&larr; Back</p>
          </Link>
        </div>

        {/* Open History log button */}
        <button
          onClick={() => setisOpenHistoryLog(true)}
          title='History log'
          className='flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 hover:cursor-pointer transition-all duration-300'
        >
          <MdHistory className='text-2xl hover:opacity-85' />
          <p className='pl-1 hidden md:block'>History log</p>
        </button>
      </div>

      <div className='w-full  border-2 border-black rounded-xl overflow-hidden'>
        {/* Title section */}
        <div className='bg-black py-4 flex justify-center'>
          <h1 className='text-white text-5xl font-bold'>
            {todoListData?.name ?? "To-Do List"}
          </h1>
        </div>

        <div className='py-8 px-9'>
          {/* Add form */}
          <AddForm<CreateTodoData> onSubmit={handleAddTodo} nameField='name' />

          {/* Items list with draggable sections */}
          {todoListData?.todoItems?.length ? (
            <div className='relative'>
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

                {/* Floating element being dragged */}
                <DragOverlay>
                  {activeItem && (
                    <li className='flex justify-between py-3 bg-white shadow-xl rounded-md opacity-50 scale-105'>
                      <h2 className='text-[24px]'> {activeItem.name}</h2>
                    </li>
                  )}
                </DragOverlay>

                {/* Section to drop items to delete */}
                <TrashZone />
              </DndContext>
            </div>
          ) : (
            <div className='flex items-center justify-center h-48'>
              <p>No tasks have been entered yet</p>
            </div>
          )}
        </div>
      </div>

      {/* History Log Drawer */}
      <Drawer
        isOpen={isOpenHistoryLog}
        setIsOpen={setisOpenHistoryLog}
        title='Action History'
      >
        <HistoryLog actionHistory={actionHistory} clearHistory={clearHistory} />
      </Drawer>
    </div>
  );
};

export default TodoList;
