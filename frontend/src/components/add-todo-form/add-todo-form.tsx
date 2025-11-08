import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";

export interface AddFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  nameField?: keyof T; // optional, in case field key changes
  placeholder?: string;
  buttonText?: string;
}

export const AddForm = <T extends FieldValues>({
  onSubmit,
  nameField,
  placeholder = "Add...",
}: AddFormProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<T>();

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='w-full mb-2 md:mb-3'
    >
      <div className='flex justify-between rounded-full border-2 border-black'>
        <input
          className='w-full px-4 py-2 mr-4 my-0.5 ml-0.5 rounded-full'
          type='text'
          placeholder={placeholder}
          {...register(nameField as Path<T>, { required: true })}
        />

        <button type='submit' disabled={isSubmitting} className=' rounded-full'>
          <MdAddCircle className='text-5xl' />
        </button>
      </div>
    </form>
  );
};
