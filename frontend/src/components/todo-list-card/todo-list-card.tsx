import React from "react";
import { URLS } from "../../constants/constants";
import { Link } from "react-router-dom";
import { TodoListData } from "../../types/todos";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

export interface TodoListButtonProps extends TodoListData {
  deleteTodoList: (id: TodoListData["id"]) => void;
}

export const TodoListCard: React.FC<TodoListButtonProps> = ({
  id,
  name,
  todoItems,
  deleteTodoList,
}) => {
  return (
    <div className='flex items-center justify-between py-4 px-5 mb-4 md:mb-5 border-2 border-black rounded-xl max-w-full'>
      <div>
        <h2 className='text-xl font-bold'>{name}</h2>
        <p>{`(${(todoItems || [])?.length}) items`}</p>
      </div>

      <div className='flex items-center gap-4'>
        <Link to={`/${URLS.TODO_LIST}/${id}`}>
          <button
            className='py-3 px-3 rounded-full border-2 border-purple-800 bg-purple-200'
            title='See more'
          >
            <IoMdEye className='text-purple-800' />
          </button>
        </Link>

        <button
          className='py-3 px-3 rounded-full border-2 border-red-700 bg-red-200'
          onClick={() => deleteTodoList(id)}
          title='Delete list'
        >
          <MdDelete className='text-red-700' />
        </button>
      </div>
    </div>
  );
};
