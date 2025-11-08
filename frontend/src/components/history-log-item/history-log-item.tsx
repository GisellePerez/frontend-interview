import React from "react";
import { TodoAction } from "../../types/todos";
import {
  MdControlPoint,
  MdOutlineCancel,
  MdOutlineChangeCircle,
  MdOutlineUpdate,
} from "react-icons/md";

const ICONS = {
  add: MdControlPoint,
  update: MdOutlineUpdate,
  delete: MdOutlineCancel,
  reorder: MdOutlineChangeCircle,
} as const;

const MESSAGES = {
  add: "was ADDED",
  update: "was UPDATED",
  delete: "was DELETED",
  reorder: "was REORDERED",
} as const;

const BG_COLORS = {
  add: "bg-green-100",
  update: "bg-purple-100",
  delete: "bg-red-100",
  reorder: "bg-blue-100",
} as const;

const TEXT_COLORS = {
  add: "text-green-500",
  update: "text-purple-500",
  delete: "text-red-500",
  reorder: "text-blue-500",
} as const;

export const HistoryLogItem: React.FC<TodoAction> = ({
  type,
  itemName,
  timestamp,
}) => {
  const Icon = ICONS[type];
  const message = MESSAGES[type];
  const textColor = TEXT_COLORS[type];
  const bgColor = BG_COLORS[type];

  return (
    <div className={`flex items-center gap-2 mb-3 p-2 rounded-md ${bgColor}`}>
      <Icon className={textColor} />

      <p>
        {`"${itemName}" ${message}`}

        <span className='text-gray-500 ml-2'>
          ({new Date(timestamp).toLocaleTimeString()})
        </span>
      </p>
    </div>
  );
};
