import { TodoAction } from "../../types/todos";

export interface HistoryLogProps {
  actionHistory: TodoAction[];
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ actionHistory }) => {
  return (
    <>
      {actionHistory?.length ? (
        <ul>
          {actionHistory.map((action) => (
            <li key={action.id}>
              {new Date(action.timestamp).toLocaleTimeString()}:
              {action.type === "add" && `"${action.itemName}" was ADDED`}
              {action.type === "update" && `"${action.itemName}" was UPDATED`}
              {action.type === "delete" && `"${action.itemName}" was DELETED`}
              {action.type === "reorder" &&
                `"${action.itemName}" was REORDERED`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No actions to show.</p>
      )}
    </>
  );
};
