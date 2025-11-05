import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TodoList } from './pages/todoList.tsx';

const routes = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/todo-list/:id', element: <TodoList />},
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={routes} />
  </StrictMode>,
)
