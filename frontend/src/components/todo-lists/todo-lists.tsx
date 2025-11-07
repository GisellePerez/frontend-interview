import { useEffect, useState } from "react";
import {
  createTodoList,
  deleteTodoListById,
  fetchAllTodoLists,
} from "../../api/todos";
import { Container } from "../container/container";
import { CreateTodoListData, TodoListData } from "../../types/todos";
import { TodoListButton } from "../todo-list-button/todo-list-button";
import { AddForm } from "../add-todo-form/add-todo-form";

export const TodoLists: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListData[]>([]);

  const deleteTodoList = async (id: TodoListData["id"]) => {
    const updatedLists = await deleteTodoListById(id);
    setTodoLists(updatedLists);
  };

  useEffect(() => {
    fetchAllTodoLists().then((data) => setTodoLists(data));
  }, []);

  if (!todoLists?.length) {
    return <div>No lists to display</div>;
  }

  return (
    <Container>
      <h1 className='mb-5 text-black text-5xl font-bold'>My Todo Lists</h1>

      <AddForm<CreateTodoListData>
        placeholder='New list name'
        buttonText='Add'
        nameField='name'
        onSubmit={async (data) => {
          const newLists = await createTodoList(data);
          setTodoLists(newLists);
        }}
      />

      <ul className='my-5 min-w-[500px]'>
        {(todoLists || []).map((list) => (
          <li key={list.id}>
            <TodoListButton {...list} deleteTodoList={deleteTodoList} />
          </li>
        ))}
      </ul>
    </Container>
  );
};
