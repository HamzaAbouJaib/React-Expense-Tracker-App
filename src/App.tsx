import { Paper } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import MainAppShell from "./components/MainAppShell";
import { AvailableCategoriesContextProvider } from "./store/AvailableCategoriesContext";
import { BudgetContextProvider } from "./store/BudgetContext";
import { ExpenseCategoriesContextProvider } from "./store/ExpenseCategoriesContext";
import { ExpensesContextProvider } from "./store/ExpensesContext";
import { HistoryContextProvider } from "./store/HistoryContext";

export default function App() {
  return (
    // Global styles
    <MantineProvider
      theme={{
        fontFamily: "open-sans",
        colorScheme: "dark",
        fontSizes: { md: 90 },
      }}
    >
      <Paper>
        {/* Contexts */}
        <AvailableCategoriesContextProvider>
          <BudgetContextProvider>
            <ExpensesContextProvider>
              <HistoryContextProvider>
                <ExpenseCategoriesContextProvider>
                  <MainAppShell />
                </ExpenseCategoriesContextProvider>
              </HistoryContextProvider>
            </ExpensesContextProvider>
          </BudgetContextProvider>
        </AvailableCategoriesContextProvider>
      </Paper>
    </MantineProvider>
  );
}
