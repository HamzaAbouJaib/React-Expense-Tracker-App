import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode } from "react";

type ExpensesContextProps = {
  children: ReactNode;
};

const ExpensesContext = createContext({
  expenses: 0,
  setExpenses: (value: number) => {},
  addToExpenses: (value: number) => {},
});

export function ExpensesContextProvider({ children }: ExpensesContextProps) {
  const [expenses, setExpenses] = useLocalStorage({
    key: "expenses",
    defaultValue: 0,
  });

  function setExpensesHandler(amount: number) {
    setExpenses(amount);
  }

  function addToExpensesHandler(amount: number) {
    setExpenses((prev) => prev + amount);
  }

  const context = {
    expenses: expenses,
    setExpenses: setExpensesHandler,
    addToExpenses: addToExpensesHandler,
  };

  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContext;
