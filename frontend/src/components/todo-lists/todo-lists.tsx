import { Container } from "../container/container";
import { CreateTodoListData } from "../../types/todos";
import { TodoListButton } from "../todo-list-button/todo-list-button";
import { AddForm } from "../add-todo-form/add-todo-form";
import { useTodoLists } from "../../hooks/useTodoLists";

export const TodoLists: React.FC = () => {
  const { todoLists, isLoading, isError, addTodoList, deleteTodoList } =
    useTodoLists();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading lists.</p>;

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
        onSubmit={(data) => addTodoList.mutate({ name: data.name })}
      />

      <ul className='my-5 min-w-[500px]'>
        {(todoLists || []).map((list) => (
          <li key={list.id}>
            <TodoListButton
              {...list}
              deleteTodoList={() => deleteTodoList.mutate(list.id)}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
};
