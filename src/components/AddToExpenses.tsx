import { Button, Divider, MultiSelect, Text, TextInput } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import DeleteCatToolTip from "./DeleteCatToolTip";

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const AddToExpenses = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { availableCategories, setAvailableCategories } = useContext(
    AvailableCategoriesContext
  );
  const { addCategory } = useContext(CategoriesContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  const [category, setCategory] = useState<string[]>([""]);
  const navigate = useNavigate();

  return (
    <div>
      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: Car payments"
        label="Label"
        withAsterisk
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 3000"
        label="Amount"
        withAsterisk
      />
      <Divider mt={30} mb={20} />
      <Text
        size="xl"
        weight={700}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
      >
        Add a Category to Your Expense
      </Text>
      <MultiSelect
        w="40%"
        mt={10}
        data={availableCategories}
        label="Select a Category"
        placeholder="Select a category or create a new one"
        searchable
        creatable
        value={category}
        onChange={setCategory}
        maxSelectedValues={1}
        getCreateLabel={(query) =>
          `+ Create ${query[0].toUpperCase() + query.substring(1)}`
        }
        onCreate={(query) => {
          const capQuery = query[0].toUpperCase() + query.substring(1);
          const item = {
            value: capQuery,
            label: capQuery,
            isused: "false",
          };
          console.log("hello");

          setAvailableCategories((current) => [item, ...current]);
          return item;
        }}
      />
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Button
          mr={30}
          onClick={() => {
            if (label === "" || value <= 0 || Number.isNaN(value)) {
              alert(
                "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
              );
            } else {
              // if the user does not select a category while creating his expense, set category equal to 'Uncatigorized'
              category[0] === undefined ||
              category[0] === null ||
              category[0] === ""
                ? (category[0] = "Uncategorized")
                : null;
              addCategory({
                label: category[0],
                amount: value,
                id: crypto.randomUUID(),
              });
              setAvailableCategories((prev) => {
                // set the isused property of the available category selected to true
                return prev.map((c) => {
                  if (c.label === category[0]) {
                    c.isused = "true";
                  }
                  return c;
                });
              });
              // navigate back to the home page
              navigate("/");
              addHistoryElement({
                label: label,
                amount: value,
                id: crypto.randomUUID(),
                type: "Expense",
                dateCreated: "",
                category: category[0],
              });
            }
          }}
        >
          Add Expense
        </Button>
        <Button
          color="red"
          onClick={() => {
            // Checks if the user has not selected a category
            if (category[0] === "") {
              alert("No category has been selected!");
            } else {
              // if they have selected a category

              // Uncategorized cannot be removed
              if (category[0] === "Uncategorized") {
                alert("Uncategorized cannot be removed!");
                return;
              }
              let removed = false; // used to check if the category has been removed
              setAvailableCategories((prev) => {
                // create a hard copy of the previous category state
                const arr: AvailableCategories[] = JSON.parse(
                  JSON.stringify(prev)
                );
                // if the category selected exists in the available categories array and its match is not being used remove the category
                arr.forEach((c, index) => {
                  if (c.label === category[0] && c.isused === "false") {
                    arr.splice(index, 1);
                    removed = true;
                  }
                });

                return arr;
              });
              // if the category has not been removed then it is being used. Show an alert to notify the user
              removed
                ? null
                : alert("Category cannot be removed since it is being used.");
            }
          }}
        >
          Remove Category
        </Button>
        <DeleteCatToolTip />
      </div>
    </div>
  );
};

export default AddToExpenses;
