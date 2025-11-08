import { TodoAction } from "../../types/todos";
import { HistoryLogItem } from "../history-log-item/history-log-item";

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
              <HistoryLogItem {...action} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No actions to show.</p>
      )}
    </>
  );
};
