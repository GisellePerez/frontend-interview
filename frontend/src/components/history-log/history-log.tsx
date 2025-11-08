import { TodoAction } from "../../types/todos";
import { HistoryLogItem } from "../history-log-item/history-log-item";

export interface HistoryLogProps {
  actionHistory: TodoAction[];
  clearHistory?: () => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({
  actionHistory,
  clearHistory = () => null,
}) => {
  return (
    <>
      {actionHistory?.length ? (
        <>
          <div className='flex items-center justify-center'>
            <button
              onClick={clearHistory}
              className='text-red-700 text-sm border-2 border-red-700 bg-red-100 px-3 py-2 mb-5 rounded-lg'
            >
              Clear history
            </button>
          </div>

          <ul>
            {actionHistory.map((action) => (
              <li key={action.id}>
                <HistoryLogItem {...action} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-center'>No actions to show.</p>
      )}
    </>
  );
};
