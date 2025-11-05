import { useParams } from "react-router-dom"
import { addTodoItem, deleteTodoItem, fetchTodoListById, toggleTodoItemDone } from "../api/todos"
import { useEffect, useState } from "react"
import { TodoListData, UpdateTodoData } from "../types/todos"
import { useForm } from "react-hook-form"


export const TodoList = () => {
  const params = useParams()
  const id = Number(params.id)
  const [listData, setListData] = useState<TodoListData>();

  useEffect(() => {
    fetchTodoListById(id).then(data => {
      setListData(data)
    })
  }, [id])


  const {
    register,
    handleSubmit,
  } = useForm<{name: string}>()
  
  const onSubmit = async (data: {name: string}) => {
   await addTodoItem(id, data.name).then(addedItem => {
      if (listData) {
        setListData({
          ...listData,
          todoItems: [...listData.todoItems, addedItem],
        })
      }
    })
  }

  const deleteItem = async (todoItemId: number) => {
    await deleteTodoItem(id, todoItemId).then(() => {
      if (listData) {
        setListData({
          ...listData,
          todoItems: listData.todoItems.filter(item => item.id !== todoItemId),
        })
      } 
    })
  }


  const updateItem = async (todoItemId: number, updatedItem: UpdateTodoData) => {
    await toggleTodoItemDone(id, todoItemId, updatedItem).then((newItem) => {
      if (listData) {
        setListData({
          ...listData,
          todoItems: listData.todoItems.map(item => item.id === todoItemId ? newItem : item),
        })
      } 
    })
  }

  if (!listData) return

  return (
    <div className="border-2 border-black w-[500px]">
      <div className="flex justify-center align-center flex-col">

    {/* Title */}
      <div className="bg-black py-2">
        <h1 className="text-white">{listData.name}</h1>
      </div>
    
    {/* Input */}
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between rounded-lg border-2 border-black">
      <input type="text" placeholder="Add your task..." {...register('name')} />
      <button className="rounded-full bg-black text-white w-[32px] h-[32px] flex justify-center align-center">
        +
      </button>
      </div>
    </form>
    


    {/* Itmes */}
      <ul>
        {listData.todoItems.map((item) =>{
          return (
            <li key={item.id} className="flex justify-between border-b-2 border-black py-2">
              <button onClick={() => updateItem(item.id, {name: item.name, description: item.description , done: !item.done})}>

              {item.done ? "✅" : "⬜️"}
              </button>
              
              <h3 className={item.done ? "line-through" : ""}>
                {item.name}
              </h3>

              <button onClick={() => deleteItem(item.id)}>x</button>
            </li>
          )
        })}
      </ul>
      </div>
    </div>
  )
}
