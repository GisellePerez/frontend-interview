import React from "react";
import { TodoAction } from "../../types/todos";
import { HistoryLogItem } from "../history-log-item/history-log-item";
import { useTranslation } from "react-i18next";

export interface HistoryLogProps {
  actionHistory: TodoAction[];
  clearHistory?: () => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({
  actionHistory,
  clearHistory = () => null,
}) => {
  const { t } = useTranslation();

  return (
    <React.Fragment data-testid='history-log'>
      {actionHistory?.length ? (
        <>
          <div className='flex items-center justify-center'>
            <button
              onClick={clearHistory}
              className='text-red-700 text-sm border-2 border-red-700 bg-red-100 px-3 py-2 mb-5 rounded-lg'
              data-testid='history-log-clear-button'
            >
              {t("historyLog.clearHistory")}
            </button>
          </div>

          <ul data-testid='history-log-list'>
            {actionHistory.map((action) => (
              <li key={action.id}>
                <HistoryLogItem {...action} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-center' data-testid='history-log-no-actions-text'>
          {t("historyLog.empty")}
        </p>
      )}
    </React.Fragment>
  );
};
