import { Container } from "../container/container";
import { CreateTodoListData } from "../../types/todos";
import { AddForm } from "../add-todo-form/add-todo-form";
import { TodoListCard } from "../todo-list-card/todo-list-card";
import { useLogic } from "./logic";
import { Modal } from "../ui/modal/modal";

export const TodoLists: React.FC = () => {
  const {
    todoLists,
    isLoading,
    isError,
    addTodoList,
    handleConfirmDelete,
    handleCancelDelete,
    selectedListId,
    setSelectedListId,
  } = useLogic();

  if (isLoading) return <p data-testid='todo-lists-loading'>Loading...</p>;

  if (isError)
    return <p data-testid='todo-lists-error'>Error loading lists.</p>;

  if (!todoLists?.length) {
    return <div data-testid='todo-lists-empty'>No lists to display</div>;
  }

  return (
    <Container>
      <h1 className='text-black mb-5 md:mb-8' data-testid='todo-lists-title'>
        My Todo Lists
      </h1>

      <AddForm<CreateTodoListData>
        placeholder='Add new todo list...'
        buttonText='Add'
        nameField='name'
        onSubmit={(data) => addTodoList.mutate({ name: data.name })}
      />

      <ul
        className='my-5 max-w-full w-full h-[70vh] overflow-y-auto'
        data-testid='todo-lists-container'
      >
        {(todoLists || []).map((list) => (
          <li key={list.id}>
            <TodoListCard
              {...list}
              deleteTodoList={() => setSelectedListId(list.id)}
            />
          </li>
        ))}
      </ul>

      {selectedListId !== null && (
        <Modal
          title='Delete this list?'
          message='This action cannot be undone. All tasks inside the list will also be deleted.'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Container>
  );
};
