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

const COLORS = {
  add: "green",
  update: "purple",
  delete: "red",
  reorder: "blue",
} as const;

export const HistoryLogItem: React.FC<TodoAction> = ({
  type,
  itemName,
  timestamp,
}) => {
  const Icon = ICONS[type];
  const message = MESSAGES[type];
  const color = COLORS[type];

  return (
    <div
      className={`flex items-center gap-2 mb-3 p-2 rounded-md bg-${color}-200`}
    >
      <Icon className={`text-${color}-500`} />

      <p>
        {`"${itemName}" ${message}`}

        <span className='text-gray-500 ml-2'>
          ({new Date(timestamp).toLocaleTimeString()})
        </span>
      </p>
    </div>
  );
};
