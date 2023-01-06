import { useContext } from "react";
import { SimpleGrid } from "@mantine/core";
import DisplayCard from "./DisplayCard";
import ExpenseCategoriesContext from "../store/ExpenseCategoriesContext";

const DisplayCategories = () => {
  const { categories } = useContext(ExpenseCategoriesContext);

  return (
    <SimpleGrid cols={4} style={{ justifyContent: "center" }}>
      {categories.map((category) => (
        <DisplayCard
          key={category.id}
          label={category.label}
          amount={category.amount}
          color="gray.6"
        />
      ))}
    </SimpleGrid>
  );
};

export default DisplayCategories;
