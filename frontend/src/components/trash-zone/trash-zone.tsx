import { useDroppable } from "@dnd-kit/core";
import { TRASH_ZONE_ID } from "../../constants/constants";
import { MdDelete } from "react-icons/md";

export const TrashZone: React.FC = () => {
  const { setNodeRef, isOver } = useDroppable({ id: TRASH_ZONE_ID });

  return (
    <div
      data-testid='trash-zone'
      ref={setNodeRef}
      className={`flex items-center justify-center gap-2 p-5 mt-6 text-red-700 border-2 border-dashed border-red-700 rounded-2xl ${
        isOver
          ? "bg-red-200 scale-105 transition-all duration-100"
          : "bg-red-100"
      }`}
      style={{
        zIndex: 50,
      }}
    >
      <MdDelete data-testid='trash-zone-delete-icon' />

      <p className='text-sm' data-testid='trash-zone-text'>
        Drag items here to delete them
      </p>
    </div>
  );
};
