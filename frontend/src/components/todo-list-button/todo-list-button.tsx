import React from "react";
import { URLS } from "../../constants/constants";
import { Link } from "react-router-dom";
import { TodoListData } from "../../types/todos";

export interface TodoListButtonProps extends TodoListData {
  deleteTodoList: (id: TodoListData["id"]) => void;
}

export const TodoListButton: React.FC<TodoListButtonProps> = ({
  id,
  name,
  todoItems,
  deleteTodoList,
}) => {
  return (
    <div className='flex items-center justify-between py-4 px-5 mb-5 border-2 border-black rounded-xl'>
      <div>
        <h2 className='text-xl font-bold'>{name}</h2>
        <p>{`(${(todoItems || [])?.length}) items`}</p>
      </div>

      <div className='flex items-center gap-4'>
        <button className='py-2 px-3 rounded-xl bg-purple-300 cursor-pointer'>
          <Link to={`/${URLS.TODO_LIST}/${id}`}>
            {/* TODO: add icon */}
            arrow
          </Link>
        </button>

        <button
          className='py-2 px-3 rounded-xl bg-red-300 cursor-pointer'
          onClick={() => deleteTodoList(id)}
        >
          {/* TODO: add icon */}
          delete
        </button>
      </div>
    </div>
  );
};
