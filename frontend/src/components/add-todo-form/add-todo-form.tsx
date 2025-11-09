import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface AddFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  nameField?: keyof T;
  placeholder?: string;
  buttonText?: string;
}

export const AddForm = <T extends FieldValues>({
  onSubmit,
  nameField,
  placeholder = "Add...",
}: AddFormProps<T>) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<T>();

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
    reset();
  };

  const fieldName = nameField as Path<T>;

  const hasError = !!errors[fieldName];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='w-full mb-2 md:mb-3'
      noValidate
      data-testid='add-form'
    >
      <div
        className={`flex justify-between rounded-full border-2 ${
          hasError ? "border-red-500" : "border-black"
        }`}
        data-testid='add-form-container'
      >
        <input
          className={`w-full px-4 py-2 mr-4 my-0.5 ml-0.5 rounded-full outline-none focus:ring-2 ${
            hasError ? "focus:ring-red-400" : "focus:ring-black"
          }`}
          type='text'
          placeholder={placeholder}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${String(nameField)}-error` : undefined}
          data-testid='add-form-input'
          {...register(fieldName, {
            required: t("form.required"),
            minLength: {
              value: 2,
              message: t("form.minLength", { min: 2 }),
            },
          })}
        />

        <button
          type='submit'
          disabled={isSubmitting}
          className={`rounded-full transition-transform duration-150 hover:scale-105 active:scale-95 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          data-testid='add-form-submit'
        >
          <MdAddCircle
            className={`text-5xl ${
              hasError ? "text-red-500" : "text-black"
            } transition-colors`}
          />
        </button>
      </div>

      {hasError && (
        <p
          id={`${String(nameField)}-error`}
          className='text-red-500 text-sm mt-1 ml-3'
          data-testid='add-form-error'
        >
          {(errors[fieldName]?.message as string) ?? t("form.required")}
        </p>
      )}
    </form>
  );
};
