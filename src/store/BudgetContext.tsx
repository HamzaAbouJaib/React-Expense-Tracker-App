import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode } from "react";

type BudgetContextProps = {
  children: ReactNode;
};

const BudgetContext = createContext({
  budget: 0,
  setBudget: (amount: number) => {},
  addToBudget: (amount: number) => {},
});

export function BudgetContextProvider({ children }: BudgetContextProps) {
  const [budget, setBudget] = useLocalStorage({
    key: "budget",
    defaultValue: 0,
  });

  function setBudgetHandler(amount: number) {
    setBudget(amount);
  }

  function addToBudgetHandler(amount: number) {
    setBudget((prev) => prev + amount);
  }

  const context = {
    budget: budget,
    setBudget: setBudgetHandler,
    addToBudget: addToBudgetHandler,
  };

  return (
    <BudgetContext.Provider value={context}>{children}</BudgetContext.Provider>
  );
}

export default BudgetContext;
