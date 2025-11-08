export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
        <h2 className='text-xl font-bold mb-3'>{title}</h2>
        <p className='text-gray-700 mb-6'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
