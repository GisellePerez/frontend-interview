import { Container } from "../container/container";
import { CreateTodoListData } from "../../types/todos";
import { AddForm } from "../add-todo-form/add-todo-form";
import { TodoListCard } from "../todo-list-card/todo-list-card";
import { useLogic } from "./logic";
import { Modal } from "../ui/modal/modal";
import { useTranslation } from "react-i18next";

export const TodoLists: React.FC = () => {
  const { t } = useTranslation();
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

  if (isLoading)
    return <p data-testid='todo-lists-loading'>{t("todoLists.loading")}</p>;

  if (isError)
    return <p data-testid='todo-lists-error'>{t("todoLists.error")}</p>;

  if (!todoLists?.length) {
    return <div data-testid='todo-lists-empty'>{t("todoLists.empty")}</div>;
  }

  return (
    <Container>
      <h1 className='text-black mb-5 md:mb-8' data-testid='todo-lists-title'>
        {t("todoLists.title")}
      </h1>

      <AddForm<CreateTodoListData>
        placeholder={t("todoLists.addPlaceholder")}
        buttonText={t("common.add")}
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
          title={t("todoLists.deleteModal.title")}
          message={t("todoLists.deleteModal.message")}
          confirmButtonText={t("todoLists.deleteModal.confirm")}
          cancelButtonText={t("todoLists.deleteModal.cancel")}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Container>
  );
};
