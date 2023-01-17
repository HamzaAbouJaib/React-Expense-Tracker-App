import { useContext } from "react";
import { SimpleGrid, Text } from "@mantine/core";
import DisplayCard from "../components/DisplayCard";
import HistoryStack from "../components/HistoryStack";
import PageContainer from "../layout/PageContainer";
import PieChart from "../components/PieChart";
import CategoriesContext from "../store/CategoriesContext";

const HomePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");

  return (
    <PageContainer>
      {/* Displays the net balance of the user */}
      <Text
        size={35}
        weight={700}
        mb={20}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[1]
              : theme.colors.gray[9],
        })}
      >
        YOUR BALANCE IS: ${budget - expenses}
      </Text>
      <SimpleGrid cols={2} style={{ justifyContent: "center" }}>
        <DisplayCard label="Income / Budget" amount={budget} color="green.4" />
        <DisplayCard label="Expenses" amount={expenses} color="red.4" />
        <HistoryStack />
        {/* Only show the pie chart when either expenses or budget is greater than 0 */}
        {(budget > 0 || expenses > 0) && <PieChart />}
      </SimpleGrid>
    </PageContainer>
  );
};

export default HomePage;
