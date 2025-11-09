import TodoList from "../components/todo-list/todo-list";
import { LanguageSwitcher } from "../components/language-switcher/language-switcher";
import { Container } from "../components/ui/container/container";

export const TodoListPage = () => {
  return (
    <div>
      <div className='flex justify-end p-4 pb-0'>
        <LanguageSwitcher />
      </div>
      <Container>
        <TodoList />
      </Container>
    </div>
  );
};
