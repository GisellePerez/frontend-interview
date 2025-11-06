import React, { useEffect, useState } from "react";
import {
  CreateTodoData,
  TodoListData,
  UpdateTodoData,
} from "../../types/todos";
import { useParams } from "react-router-dom";
import {
  addTodoItem,
  deleteTodoItem,
  fetchTodoListById,
  toggleTodoItemDone,
} from "../../api/todos";

import { TodoItem } from "../todo-item/todo-item";
import { AddTodoForm } from "../add-todo-form/add-todo-form";

const TodoList: React.FC = () => {
  const params = useParams();
  const listIdParam = Number(params.id);

  const [todoListData, setTodoListData] = useState<TodoListData>();

  const onSubmit = async (data: CreateTodoData) => {
    await addTodoItem(listIdParam, data.name).then((addedItem) => {
      if (todoListData) {
        setTodoListData({
          ...todoListData,
          todoItems: [...todoListData.todoItems, addedItem],
        });
      }
    });

    // TODO: reset form input after submit
    // TODO: Show error message if failed
  };

  const deleteItem = async (todoItemId: number) => {
    await deleteTodoItem(listIdParam, todoItemId).then(() => {
      if (todoListData) {
        setTodoListData({
          ...todoListData,
          todoItems: todoListData.todoItems.filter(
            (item) => item.id !== todoItemId,
          ),
        });
      }
    });
  };

  const updateItem = async (
    todoItemId: number,
    updatedItem: UpdateTodoData,
  ) => {
    await toggleTodoItemDone(listIdParam, todoItemId, updatedItem).then(
      (newItem) => {
        if (todoListData) {
          setTodoListData({
            ...todoListData,
            todoItems: todoListData.todoItems.map((item) =>
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
    <div className='m-auto w-[90%] max-w-[790px] border-2 border-black rounded-xl overflow-hidden'>
      <div className='bg-black py-4 flex justify-center'>
        <h1 className='text-white text-5xl font-bold'>
          {todoListData?.name ?? "To-Do List"}
        </h1>
      </div>

      <div className='py-8 px-9'>
        <AddTodoForm onSubmit={onSubmit} />

        {todoListData?.todoItems?.length ? (
          <ul className='mt-5 '>
            {todoListData.todoItems.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <TodoItem
                    {...item}
                    deleteItem={deleteItem}
                    updateItem={updateItem}
                  />
                </React.Fragment>
              );
            })}
          </ul>
        ) : (
          <div className='flex items-center justify-center h-48'>
            <p>No tasks have been entered yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
