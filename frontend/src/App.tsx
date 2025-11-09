import { TodoLists } from "./components/todo-lists/todo-lists";
import { LanguageSwitcher } from "./components/language-switcher/language-switcher";

function App() {
  return (
    <div>
      <div className='flex justify-end p-4 pb-0'>
        <LanguageSwitcher />
      </div>
      <TodoLists />
    </div>
  );
}

export default App;
