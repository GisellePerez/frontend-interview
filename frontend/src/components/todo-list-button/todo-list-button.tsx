import React from "react";
import { URLS } from "../../constants/constants";
import { Link } from "react-router-dom";
import { TodoListData } from "../../types/todos";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

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
        <Link to={`/${URLS.TODO_LIST}/${id}`}>
          <button
            className='py-3 px-3 rounded-full bg-purple-400'
            title='See more'
          >
            <IoMdEye className='text-gray-900' />
          </button>
        </Link>

        <button
          className='py-3 px-3 rounded-full bg-red-400'
          onClick={() => deleteTodoList(id)}
          title='Delete list'
        >
          <MdDelete className='text-gray-900' />
        </button>
      </div>
    </div>
  );
};
