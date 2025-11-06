import { useForm } from "react-hook-form";
import { CreateTodoData } from "../../types/todos";
import { PlusIcon } from "../../assets/plus-icon";

export interface AddTodoFormProps {
  onSubmit: (data: CreateTodoData) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<CreateTodoData>();

  return (
    <form action='post' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between rounded-full border-2 border-black'>
        <input
          className='w-full px-4 py-2 rounded-full'
          type='text'
          placeholder='Add your task...'
          {...register("name", { required: true })}
        />

        <button className='flex items-center justify-center rounded-full bg-black w-10 h-10'>
          <div className='bg-white scale-0.6'>
            <PlusIcon />
          </div>
        </button>
      </div>
    </form>
  );
};
