import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import BudgetContext from "../store/BudgetContext";
import HistoryContext from "../store/HistoryContext";
import ExpenseCategoriesContext from "../store/ExpenseCategoriesContext";

const SetBudget = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { addCategory } = useContext(ExpenseCategoriesContext);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 5000"
        label="Enter your budget"
        withAsterisk
      />
      <Button
        mt={20}
        onClick={() => {
          // checks that the user inputted valid values
          if (value <= 0 || Number.isNaN(value)) {
            alert("Invalid Entry. Make sure the amount is greater than zero.");
          } else {
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: value,
            });
            // navigates back to home page
            navigate("/");
            addHistoryElement({
              label: "Budget has been set to $" + value,
              id: crypto.randomUUID(),
              amount: value,
              type: "Budget",
              dateCreated: "", // dateCreated passes an empty string here as the actual date creation is handled in the addHisotyrElement function
              category: "Budget",
            });
          }
        }}
      >
        Set Budget
      </Button>
    </div>
  );
};

export default SetBudget;
