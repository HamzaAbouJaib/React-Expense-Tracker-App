import { ActionIcon, Tooltip } from "@mantine/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
const DeleteCatToolTip = () => {
  return (
    <Tooltip
      label="Select a category and click 'Delete Category' to delete the selected category. This will only delete the category from the dropdown menu. You cannot delete a category that is being used."
      color="gray.8"
      withArrow
      multiline
      width={400}
    >
      <ActionIcon variant="transparent">
        <AiOutlineInfoCircle />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteCatToolTip;
