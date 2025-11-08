import { useDroppable } from "@dnd-kit/core";
import { TRASH_ZONE_ID } from "../../constants/constants";

export const TrashZone: React.FC = () => {
  const { setNodeRef, isOver } = useDroppable({ id: TRASH_ZONE_ID });

  return (
    <div
      ref={setNodeRef}
      className={`p-5 ${isOver ? "bg-red-500 scale-110" : "bg-gray-300"}`}
      style={{
        zIndex: 50,
      }}
    >
      Trash zone
    </div>
  );
};
