import React from "react";
import { TodoData, UpdateTodoData } from "../../types/todos";
import { DeleteIcon } from "../../assets/delete-icon";
import { CheckedIcon } from "../../assets/checked-icon";
import { UncheckedIcon } from "../../assets/unchecked-icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";

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
      className='flex justify-between my-5'
    >
      <div className='flex items-center gap-3'>
        <div
          {...listeners}
          className='flex items-center h-full cursor-grab active:cursor-grabbing text-gray-400'
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
        >
          {done ? <CheckedIcon /> : <UncheckedIcon />}
        </button>

        <h2 className={`text-[18px] ${done ? "line-through" : ""}`}>{name}</h2>
      </div>

      <button
        onClick={() => deleteItem(id)}
        className='p-1 rounded-full hover:cursor-pointer hover:bg-red-100 transition-all'
      >
        <DeleteIcon />
      </button>
    </li>
  );
};
