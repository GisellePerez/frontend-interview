import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { PlusIcon } from "../../assets/plus-icon";

export interface AddFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  nameField?: keyof T; // optional, in case your field key changes
  placeholder?: string;
  buttonText?: string;
}

export const AddForm = <T extends FieldValues>({
  onSubmit,
  nameField,
  placeholder = "Add your task...",
  buttonText = "Add",
}: AddFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between rounded-full border-2 border-black'>
        <input
          className='w-full px-4 py-2 rounded-full'
          type='text'
          placeholder={placeholder}
          {...register(nameField as Path<T>, { required: true })}
        />

        <button type='submit' disabled={isSubmitting}>
          {buttonText ? (
            <p>{buttonText}</p>
          ) : (
            <div className='flex items-center justify-center rounded-full bg-black w-10 h-10'>
              <div className='bg-white scale-0.6'>
                {buttonText ?? <PlusIcon />}
              </div>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};
