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
      {...attributes}
      className='flex justify-between items-center my-5'
    >
      <div className='flex items-center gap-3'>
        <div
          {...listeners}
          className='flex items-center h-full cursor-grab active:cursor-grabbing text-gray-400 '
          title='Drag to reorder'
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
          className='flex items-center gap-3'
        >
          <div className='rounded-full h-8 w-8 flex items-center justify-center'>
            {done ? (
              <MdCheckCircle className='text-3xl ' />
            ) : (
              <MdOutlineCircle className='text-3xl' />
            )}
          </div>

          <h2 className={`text-[18px] ${done ? "line-through" : ""}`}>
            {name}
          </h2>
        </button>
      </div>

      <button
        onClick={() => deleteItem(id)}
        className='p-1 rounded-full hover:cursor-pointer border-2 border-transparent hover:bg-red-100 hover:text-red-700 hover:border-red-700  transition-all h-8 w-8 flex items-center justify-center'
      >
        <MdClose className='text-3xl' />
      </button>
    </li>
  );
};
