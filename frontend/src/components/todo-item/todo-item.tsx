import React from "react";
import { TodoData, UpdateTodoData } from "../../types/todos";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MdCheckCircle,
  MdClose,
  MdOutlineCircle,
  MdOutlineDragIndicator,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface TodoItemProps extends TodoData {
  updateItem: (todoItemId: number, updatedItem: UpdateTodoData) => void;
  deleteItem: (todoItemId: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  description,
  done,
  deleteItem,
  updateItem,
}) => {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className='flex justify-between items-center my-5'
      data-testid='todo-item'
    >
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        <div
          {...listeners}
          {...attributes}
          className='flex items-center h-full cursor-grab active:cursor-grabbing text-gray-400 touch-none'
          title={t("todoList.dragToReorder")}
          data-testid='todo-item-drag-handle'
        >
          <MdOutlineDragIndicator className='text-2xl' />
        </div>

        <button
          onClick={() =>
            updateItem(id, {
              name: name,
              description: description,
              done: !done,
            })
          }
          className='flex items-center gap-3 min-w-0 flex-1'
          data-testid='todo-item-update-button'
        >
          <div className='rounded-full h-8 w-8 flex items-center justify-center shrink-0'>
            {done ? (
              <MdCheckCircle
                className='text-3xl'
                data-testid='todo-item-checked-icon'
              />
            ) : (
              <MdOutlineCircle
                className='text-3xl'
                data-testid='todo-item-unchecked-icon'
              />
            )}
          </div>

          <h2
            className={`text-[18px] ${done ? "line-through" : ""} truncate`}
            data-testid='todo-item-name'
          >
            {name}
          </h2>
        </button>
      </div>

      <button
        onClick={() => deleteItem(id)}
        className='p-1 rounded-full hover:cursor-pointer border-2 border-transparent hover:bg-red-100 hover:text-red-700 hover:border-red-700  transition-all h-8 w-8 flex items-center justify-center'
        data-testid='todo-item-delete-button'
      >
        <MdClose className='text-3xl' />
      </button>
    </li>
  );
};
