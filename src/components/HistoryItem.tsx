import { useState } from "react";
import { Card, Text } from "@mantine/core";
import HistoryModal from "./HistoryModal";

type HistoryItemProps = {
  label: string;
  amount: number;
  type: string;
  id: string;
  dateCreated: string;
  category: string;
};

const HistoryItem = ({
  label,
  amount,
  type,
  id,
  dateCreated,
  category
}: HistoryItemProps) => {
  const [opened, setOpened] = useState(false);
  // #69DB7C is green.4 and #FF8787 is red.4.
  const color =
    type === "Budget" || type === "Expenses Reset" ? "#69DB7C" : "#FF8787";

  return (
    <>
      <HistoryModal
        opened={opened}
        setOpened={setOpened}
        label={label}
        amount={amount}
        type={type}
        dateCreated={dateCreated}
        id={id}
        category={category}
      />
      <Card
        shadow="sm"
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRight: `4px solid ${color}`,
        }}
        onClick={() => {
          setOpened(true);
        }}
      >
        <Text weight={500} size={15}>
          {/* Truncate the label if its length exceeds 44 characters */}
          {label.length > 44 ? label.slice(0, 44) + "..." : label}
        </Text>
        <Text size={15} color={color} weight={500}>
          {/* Display the correct sign based on the type of transaction */}
          {type === "Budget" || type === "Expenses Reset" ? "+" : "-"}$
          {amount.toLocaleString("en-US")}
        </Text>
      </Card>
    </>
  );
};

export default HistoryItem;
