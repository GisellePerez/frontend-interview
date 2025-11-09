export interface ModalProps {
  title: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  message,
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      data-testid='modal-overlay'
    >
      <div
        className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'
        data-testid='modal-content'
      >
        <h2 className='text-xl font-bold mb-3' data-testid='modal-title'>
          {title}
        </h2>
        <p className='text-gray-700 mb-6' data-testid='modal-message'>
          {message}
        </p>

        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition'
            data-testid='modal-cancel-button'
          >
            {cancelButtonText}
          </button>

          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
            data-testid='modal-confirm-button'
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
