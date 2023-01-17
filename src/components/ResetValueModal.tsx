import { Button, Flex, Modal, Text } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

type ResetValueModalProps = {
  type: string;
  prevAmount: number;
};

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const ResetValueModal = ({ type, prevAmount }: ResetValueModalProps) => {
  const [opened, setOpened] = useState(false);
  const { addHistoryElement } = useContext(HistoryContext);
  const { resetAmount } = useContext(CategoriesContext);
  const { setAvailableCategories } = useContext(AvailableCategoriesContext);

  const navigate = useNavigate();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title={`Are you sure you want to reset your ${type.toLowerCase()} to 0?`}
      >
        <Text
          mt={-17}
          mb={20}
          size="xs"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
            lineHeight: 1.3,
          })}
        >
          This action can be later undone by deleting the transaction.{" "}
          {type === "Expenses" &&
            "However the expense categories will return and the amount will be put under Uncategorized"}
        </Text>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button
            color="red"
            onClick={() => {
              // sets the value of expenses/budget to 0
              resetAmount(type);
              setOpened(false);
              addHistoryElement({
                label: `${type} has been reset to 0`,
                amount: prevAmount,
                id: crypto.randomUUID(),
                type: `${type} Reset`,
                dateCreated: "", // dateCreated passes an empty string here as the actual date creation is handled in the addHisotyrElement function
                category: `${type} Reset`,
              });
              if (type === "Expenses") {
                // set the isused property on all items in the available categories array to false since all categories have 0 amounts now that the expenses have been reset
                setAvailableCategories((prev) => {
                  const arr: AvailableCategories[] = JSON.parse(
                    JSON.stringify(prev)
                  );
                  arr.forEach((c) => {
                    c.isused = "false";
                  });
                  return arr;
                });
              }
              // navigates to home page
              navigate("/");
            }}
          >
            Reset {type}
          </Button>
          <Button onClick={() => setOpened(false)}>Cancel</Button>
        </div>
      </Modal>

      <Flex mt={20} direction="column" justify="flex-start" align="flex-start">
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
          Reset Your {type}
        </Text>
        <Text
          size="xs"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
          })}
        >
          Resets your {type.toLowerCase()} back to 0
        </Text>
        <Button mt={20} color="red" onClick={() => setOpened(true)}>
          Reset {type}
        </Button>
      </Flex>
    </>
  );
};

export default ResetValueModal;
