import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode } from "react";

type HistoryContextProps = {
  children: ReactNode;
};

type HistoryElement = {
  id: string;
  label: string;
  amount: number;
  type: string;
  dateCreated: string;
  category: string;
};

type HistoryContextType = {
  history: HistoryElement[];
  setHistory: (history: HistoryElement[]) => void;
  addHistoryElement: (element: HistoryElement) => void;
  deleteHistoryElement: (id: string) => void;
};

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  setHistory: (history: HistoryElement[]) => {},
  addHistoryElement: (element: HistoryElement) => {},
  deleteHistoryElement: (id: string) => {},
});

export function HistoryContextProvider({ children }: HistoryContextProps) {
  const [history, setHistory] = useLocalStorage<HistoryElement[]>({
    key: "History",
    defaultValue: [],
  });

  function setHistoryHandler(history: HistoryElement[]) {
    setHistory(history);
  }

  // takes in a historyElement item and adds it to the history
  function addHistoryElementHandler(element: HistoryElement) {
    // creates a new date
    var today = new Date();
    var date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    setHistory((prev: HistoryElement[]) => {
      return [
        {
          label: element.label,
          amount: element.amount,
          type: element.type,
          id: element.id,
          dateCreated: date,
          category: element.category,
        },
        ...prev,
      ];
    });
  }

  // takes in an ID and deletes the history element with that ID
  function deleteHistoryElementHandler(id: string) {
    setHistory((prev) => {
      return prev.filter((h) => h.id !== id);
    });
  }

  const context = {
    history: history,
    setHistory: setHistoryHandler,
    addHistoryElement: addHistoryElementHandler,
    deleteHistoryElement: deleteHistoryElementHandler,
  };

  return (
    <HistoryContext.Provider value={context}>
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryContext;
